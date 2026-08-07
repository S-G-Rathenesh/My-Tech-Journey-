'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface AiResearchLabProps {
  isHighlighted?: boolean;
}

export const AiResearchLab: React.FC<AiResearchLabProps> = ({ isHighlighted }) => {
  const brainRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (brainRef.current) {
      brainRef.current.rotation.y = time * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.8;
      ringRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group position={[0, 0, 20]}>
      {/* Zone Platform Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[7, 7.5, 0.3, 32]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Holographic AI Brain / Core Sphere */}
      <mesh ref={brainRef} position={[0, 3.5, 0]}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#8B5CF6"
          emissiveIntensity={isHighlighted ? 2.5 : 1.5}
          wireframe
        />
      </mesh>

      {/* Rotating Cyber Ring */}
      <mesh ref={ringRef} position={[0, 3.5, 0]}>
        <torusGeometry args={[2.4, 0.04, 16, 64]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
      </mesh>

      {/* Pedestal Base for AI Resume Builder */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.5, 1.2, 2.5]} />
        <meshStandardMaterial
          color="#0F0C1E"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Title Hologram Banner */}
      <Text position={[0, 6.2, 0]} fontSize={0.7} color="#A855F7" anchorX="center">
        AI RESEARCH FACILITY
      </Text>
      <Text position={[0, 5.4, 0]} fontSize={0.4} color="#06B6D4" anchorX="center">
        AI Resume Builder & Neural Architectures
      </Text>

      {/* Interactive Pedestal Prompt */}
      <Text position={[0, 2.0, 0]} fontSize={0.35} color={isHighlighted ? "#EC4899" : "#A855F7"}>
        {isHighlighted ? '[ PRESS E / TAP TO INSPECT ]' : 'Inspect AI Resume Builder'}
      </Text>
    </group>
  );
};
