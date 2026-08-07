'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { audioManager } from '@/lib/audioManager';

interface PlayablePlayerProps {
  onPositionUpdate: (pos: [number, number, number]) => void;
  onFirstMove: () => void;
  joystickInput?: { x: number; y: number } | null;
  isMobileJumpPressed?: boolean;
}

export const PlayablePlayer: React.FC<PlayablePlayerProps> = ({
  onPositionUpdate,
  onFirstMove,
  joystickInput,
  isMobileJumpPressed,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const isJumping = useRef(false);
  const keys = useRef<{ [key: string]: boolean }>({});
  const { camera } = useThree();

  // Materialization Spawn State
  const [spawnScale, setSpawnScale] = useState(0);
  const hasTriggeredMove = useRef(false);

  useEffect(() => {
    // Materialization timeline over 1.5 seconds
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / 1.5, 1.0);
      setSpawnScale(progress);
      if (progress >= 1.0) {
        clearInterval(interval);
      }
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;

      // Check first movement trigger
      if (
        ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) &&
        !hasTriggeredMove.current
      ) {
        hasTriggeredMove.current = true;
        onFirstMove();
      }

      if (e.code === 'Space' && !isJumping.current && spawnScale >= 1.0) {
        isJumping.current = true;
        velocity.current.y = 7.5;
        audioManager.playJumpSound();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onFirstMove, spawnScale]);

  // Mobile Jump Trigger
  useEffect(() => {
    if (isMobileJumpPressed && !isJumping.current && spawnScale >= 1.0) {
      isJumping.current = true;
      velocity.current.y = 7.5;
      audioManager.playJumpSound();
    }
  }, [isMobileJumpPressed, spawnScale]);

  useFrame((_, delta) => {
    if (!groupRef.current || spawnScale < 0.2) return;

    const moveSpeed = keys.current['ShiftLeft'] || keys.current['ShiftRight'] ? 12 : 7;
    const moveVector = new THREE.Vector3();

    // Desktop Keyboard Movement
    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveVector.z -= 1;
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveVector.z += 1;
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveVector.x -= 1;
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveVector.x += 1;

    // Mobile Touch Joystick Movement
    if (joystickInput && (Math.abs(joystickInput.x) > 0.1 || Math.abs(joystickInput.y) > 0.1)) {
      moveVector.x = joystickInput.x;
      moveVector.z = -joystickInput.y;

      if (!hasTriggeredMove.current) {
        hasTriggeredMove.current = true;
        onFirstMove();
      }
    }

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize();

      // Move relative to camera yaw angle
      const cameraYaw = Math.atan2(
        camera.position.x - groupRef.current.position.x,
        camera.position.z - groupRef.current.position.z
      );

      const rotatedVector = new THREE.Vector3(
        moveVector.x * Math.cos(cameraYaw) - moveVector.z * Math.sin(cameraYaw),
        0,
        moveVector.x * Math.sin(cameraYaw) + moveVector.z * Math.cos(cameraYaw)
      );

      groupRef.current.position.x += rotatedVector.x * moveSpeed * delta;
      groupRef.current.position.z += rotatedVector.z * moveSpeed * delta;

      // Smooth Avatar Rotation
      const targetRotation = Math.atan2(rotatedVector.x, rotatedVector.z);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.18
      );
    }

    // Boundary Collision Logic
    // If player is on Memory Lane bridge (Math.abs(x) <= 2.6 and Z < -17.5), allow travel down to Z = -74.5
    if (Math.abs(groupRef.current.position.x) <= 2.6 && groupRef.current.position.z < -17.5) {
      groupRef.current.position.x = THREE.MathUtils.clamp(groupRef.current.position.x, -2.4, 2.4);
      groupRef.current.position.z = THREE.MathUtils.clamp(groupRef.current.position.z, -74.5, 17.5);
    } else {
      // Circular Platform Radius 17.5 Limit
      const distFromOrigin = Math.sqrt(
        groupRef.current.position.x * groupRef.current.position.x +
        groupRef.current.position.z * groupRef.current.position.z
      );

      if (distFromOrigin > 17.5) {
        const angle = Math.atan2(groupRef.current.position.z, groupRef.current.position.x);
        groupRef.current.position.x = Math.cos(angle) * 17.5;
        groupRef.current.position.z = Math.sin(angle) * 17.5;
      }
    }

    // Vertical Physics & Jump Mechanics
    if (isJumping.current || groupRef.current.position.y > 0.5) {
      groupRef.current.position.y += velocity.current.y * delta;
      velocity.current.y -= 22 * delta;

      if (groupRef.current.position.y <= 0.5) {
        groupRef.current.position.y = 0.5;
        isJumping.current = false;
        velocity.current.y = 0;
      }
    }

    const currentPos: [number, number, number] = [
      groupRef.current.position.x,
      groupRef.current.position.y,
      groupRef.current.position.z,
    ];

    onPositionUpdate(currentPos);

    // Third-person Smooth Follow Camera
    const cameraTarget = new THREE.Vector3(
      groupRef.current.position.x,
      groupRef.current.position.y + 6.5,
      groupRef.current.position.z + 10.5
    );
    camera.position.lerp(cameraTarget, 0.08);
    camera.lookAt(groupRef.current.position.x, groupRef.current.position.y + 1.2, groupRef.current.position.z);
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]} scale={[spawnScale, spawnScale, spawnScale]}>
      {/* Player Capsule Avatar */}
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.4, 0.8, 16, 32]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#8B5CF6"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Visor Core */}
      <mesh position={[0, 1.1, 0.35]}>
        <boxGeometry args={[0.45, 0.18, 0.15]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.0} />
      </mesh>

      {/* Ground Projection Ring */}
      <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.65, 32]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Materialization Particle Swirl Ring */}
      {spawnScale < 1.0 && (
        <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.4, 32]} />
          <meshBasicMaterial color="#EC4899" transparent opacity={1 - spawnScale} side={THREE.DoubleSide} />
        </mesh>
      )}

      <pointLight color="#A855F7" intensity={2} distance={8} position={[0, 1, 0]} />
    </group>
  );
};
