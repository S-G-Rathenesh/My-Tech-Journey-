'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExaCompanionProps {
  playerPos: [number, number, number];
}

export const ExaCompanion: React.FC<ExaCompanionProps> = ({ playerPos }) => {
  const exaRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!exaRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating offset relative to player
    const targetX = playerPos[0] + Math.sin(time * 1.5) * 1.6 + 1.2;
    const targetY = playerPos[1] + 1.8 + Math.sin(time * 3) * 0.25;
    const targetZ = playerPos[2] + Math.cos(time * 1.5) * 1.6 - 0.8;

    exaRef.current.position.x = THREE.MathUtils.lerp(exaRef.current.position.x, targetX, 0.08);
    exaRef.current.position.y = THREE.MathUtils.lerp(exaRef.current.position.y, targetY, 0.08);
    exaRef.current.position.z = THREE.MathUtils.lerp(exaRef.current.position.z, targetZ, 0.08);

    // Rotate holographic rings around EXA core
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 2;
      ringRef.current.rotation.y = time * 1.5;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.x = -time * 1.8;
      ringRef2.current.rotation.z = time * 2.2;
    }
  });

  return (
    <group ref={exaRef} position={[1.5, 2.5, -1]}>
      {/* EXA Core Hologram */}
      <mesh>
        <icosahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#22D3EE"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>

      {/* Orbiting Holographic Rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.42, 0.015, 16, 32]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={1.5} />
      </mesh>

      <mesh ref={ringRef2}>
        <torusGeometry args={[0.55, 0.012, 16, 32]} />
        <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={1.5} />
      </mesh>

      {/* Companion Glow Light */}
      <pointLight color="#06B6D4" intensity={1.5} distance={5} />
    </group>
  );
};
