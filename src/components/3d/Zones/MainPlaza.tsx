'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const MainPlaza: React.FC = () => {
  const monolithRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (monolithRef.current) {
      monolithRef.current.rotation.y = t * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.6;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Monolith Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[4, 4.5, 0.4, 32]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Outer Glowing Neon Spawn Ring */}
      <mesh ref={ringRef} position={[0, 0.41, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.8, 64]} />
        <meshBasicMaterial color="#A855F7" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* Floating Monolith Core */}
      <mesh ref={monolithRef} position={[0, 4, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#8B5CF6"
          emissiveIntensity={1.8}
          wireframe
        />
      </mesh>

      {/* Monolith Holographic Label */}
      <Text
        position={[0, 7, 0]}
        fontSize={0.8}
        color="#A855F7"
        anchorX="center"
        anchorY="middle"
      >
        INNOVATION DISTRICT
      </Text>

      {/* Signposts pointing to 4 Quadrants */}
      {/* North: AI Research Facility */}
      <group position={[0, 0, 7]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.4]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="#06B6D4">
          ▲ NORTH: AI RESEARCH FACILITY
        </Text>
      </group>

      {/* West: Mobile Innovation Center */}
      <group position={[-7, 0, 0]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.4]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="#06B6D4">
          ◀ WEST: MOBILE INNOVATION CENTER
        </Text>
      </group>

      {/* East: Hall of Milestones */}
      <group position={[7, 0, 0]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.4]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="#06B6D4">
          EAST: HALL OF MILESTONES ▶
        </Text>
      </group>

      {/* South: Future Gateway & Nexus */}
      <group position={[0, 0, -7]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.4]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="#06B6D4">
          ▼ SOUTH: FUTURE GATEWAY & NEXUS
        </Text>
      </group>
    </group>
  );
};
