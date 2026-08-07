'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { audioManager } from '@/lib/audioManager';

interface PlayerProps {
  onPositionUpdate: (pos: [number, number, number]) => void;
  onZoneChange: (zone: string) => void;
  onProximityProject: (projectId: string | null) => void;
  joystickInput?: { x: number; y: number } | null;
  isMobileJumpPressed?: boolean;
  isMobileInteractPressed?: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  onPositionUpdate,
  onZoneChange,
  onProximityProject,
  joystickInput,
  isMobileJumpPressed,
  isMobileInteractPressed,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const isJumping = useRef(false);
  const currentZone = useRef<string>('Main Plaza');

  const keys = useRef<{ [key: string]: boolean }>({});
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
      if (e.code === 'Space' && !isJumping.current) {
        isJumping.current = true;
        velocity.current.y = 7;
        audioManager.playJumpSound();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle Mobile Jump Trigger
  useEffect(() => {
    if (isMobileJumpPressed && !isJumping.current) {
      isJumping.current = true;
      velocity.current.y = 7;
      audioManager.playJumpSound();
    }
  }, [isMobileJumpPressed]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const moveSpeed = keys.current['ShiftLeft'] || keys.current['ShiftRight'] ? 12 : 7;
    const moveVector = new THREE.Vector3();

    // Desktop Keyboard Input
    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveVector.z -= 1;
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveVector.z += 1;
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveVector.x -= 1;
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveVector.x += 1;

    // Mobile Joystick Input
    if (joystickInput && (Math.abs(joystickInput.x) > 0.1 || Math.abs(joystickInput.y) > 0.1)) {
      moveVector.x = joystickInput.x;
      moveVector.z = -joystickInput.y;
    }

    // Camera relative movement
    if (moveVector.lengthSq() > 0) {
      moveVector.normalize();
      
      // Calculate movement relative to camera yaw angle
      const cameraYaw = Math.atan2(
        camera.position.x - meshRef.current.position.x,
        camera.position.z - meshRef.current.position.z
      );
      
      const rotatedVector = new THREE.Vector3(
        moveVector.x * Math.cos(cameraYaw) - moveVector.z * Math.sin(cameraYaw),
        0,
        moveVector.x * Math.sin(cameraYaw) + moveVector.z * Math.cos(cameraYaw)
      );

      meshRef.current.position.x += rotatedVector.x * moveSpeed * delta;
      meshRef.current.position.z += rotatedVector.z * moveSpeed * delta;

      // Rotate player avatar smooth to direction
      const targetRotation = Math.atan2(rotatedVector.x, rotatedVector.z);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation,
        0.15
      );
    }

    // Vertical Jump Physics & Gravity
    if (isJumping.current || meshRef.current.position.y > 0.5) {
      meshRef.current.position.y += velocity.current.y * delta;
      velocity.current.y -= 20 * delta; // Gravity

      if (meshRef.current.position.y <= 0.5) {
        meshRef.current.position.y = 0.5;
        isJumping.current = false;
        velocity.current.y = 0;
      }
    }

    // Keep within world bounds
    meshRef.current.position.x = THREE.MathUtils.clamp(meshRef.current.position.x, -50, 50);
    meshRef.current.position.z = THREE.MathUtils.clamp(meshRef.current.position.z, -55, 35);

    const playerPos: [number, number, number] = [
      meshRef.current.position.x,
      meshRef.current.position.y,
      meshRef.current.position.z,
    ];

    onPositionUpdate(playerPos);

    // Dynamic Zone Detection
    const x = playerPos[0];
    const z = playerPos[2];
    let detectedZone = 'Innovation District';

    if (z > 10) detectedZone = 'AI Research Facility';
    else if (x < -12) detectedZone = 'Mobile Innovation Center';
    else if (x > 12) detectedZone = 'Hall of Milestones';
    else if (z < -15 && z > -32) detectedZone = 'Future Gateway';
    else if (z <= -32) detectedZone = 'Communication Nexus';

    if (detectedZone !== currentZone.current) {
      currentZone.current = detectedZone;
      onZoneChange(detectedZone);
      audioManager.playZoneChime();
    }

    // Proximity Trigger Detection for Projects
    const projectTriggers: { id: string; pos: [number, number, number]; radius: number }[] = [
      { id: 'ai-resume-builder', pos: [0, 1.5, 20], radius: 4 },
      { id: 'wake-up-darling', pos: [-22, 1.5, 4], radius: 3.5 },
      { id: 'paalkaran', pos: [-22, 1.5, -4], radius: 3.5 },
      { id: 'vibesync', pos: [-26, 1.5, 0], radius: 3.5 },
      { id: 'spendguard', pos: [-18, 1.5, 0], radius: 3.5 },
      { id: 'inventory-management', pos: [-4, 2, -22], radius: 3.5 },
      { id: 'fillpill', pos: [0, 2, -26], radius: 3.5 },
      { id: 'photographic-memory-game', pos: [4, 2, -22], radius: 3.5 },
      { id: 'contact-nexus', pos: [0, 1.5, -40], radius: 4 },
    ];

    let foundProjectId: string | null = null;
    for (const item of projectTriggers) {
      const dx = playerPos[0] - item.pos[0];
      const dz = playerPos[2] - item.pos[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < item.radius) {
        foundProjectId = item.id;
        break;
      }
    }

    onProximityProject(foundProjectId);

    // Third-person Camera Smooth Follow
    const cameraTarget = new THREE.Vector3(
      meshRef.current.position.x,
      meshRef.current.position.y + 7,
      meshRef.current.position.z + 11
    );
    camera.position.lerp(cameraTarget, 0.08);
    camera.lookAt(meshRef.current.position.x, meshRef.current.position.y + 1.2, meshRef.current.position.z);
  });

  return (
    <group ref={meshRef} position={[0, 0.5, 0]}>
      {/* Cyber Player Drone Avatar */}
      {/* Outer Neon Octahedron Shell */}
      <mesh position={[0, 0.6, 0]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#8B5CF6"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Inner Glowing Cyan Core */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Ground Projection Ring */}
      <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.65, 32]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Dynamic Light source attached to Player */}
      <pointLight color="#A855F7" intensity={2} distance={8} position={[0, 1, 0]} />
    </group>
  );
};
