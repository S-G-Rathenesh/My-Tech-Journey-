'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface CommunicationNexusProps {
  isHighlighted?: boolean;
}

export const CommunicationNexus: React.FC<CommunicationNexusProps> = ({ isHighlighted }) => {
  const towerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (towerRef.current) {
      towerRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group position={[0, 0, -40]}>
      {/* Platform Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[6, 6.5, 0.3, 32]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Transmission Tower Structure */}
      <group ref={towerRef} position={[0, 3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.8, 5, 8]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={isHighlighted ? 2.5 : 1}
            wireframe
          />
        </mesh>
      </group>

      <Text position={[0, 7.2, 0]} fontSize={0.7} color="#06B6D4" anchorX="center">
        COMMUNICATION NEXUS
      </Text>
      <Text position={[0, 6.5, 0]} fontSize={0.35} color="#A855F7" anchorX="center">
        Direct Transmission to Developer
      </Text>

      {/* Interactive Contact Prompt */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.38}
        color={isHighlighted ? "#EC4899" : "#06B6D4"}
      >
        {isHighlighted ? '[ PRESS E / TAP TO DISPATCH MESSAGE ]' : 'Approach Terminal to Connect'}
      </Text>
    </group>
  );
};
