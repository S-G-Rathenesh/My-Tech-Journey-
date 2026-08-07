'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const HolographicWorldLogo: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating oscillation
      groupRef.current.position.y = 12 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 12, 0]}>
      {/* Primary Title */}
      <Text
        fontSize={1.4}
        color="#A855F7"
        anchorX="center"
        anchorY="middle"
      >
        E'xploreMe
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -1.0, 0]}
        fontSize={0.55}
        color="#06B6D4"
        anchorX="center"
        anchorY="middle"
      >
        The Path Begins
      </Text>

      {/* Holographic Glowing Base Ring */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 3.5, 32]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
