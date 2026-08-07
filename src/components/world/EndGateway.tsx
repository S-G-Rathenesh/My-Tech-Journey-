'use client';

import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const EndGateway: React.FC = () => {
  return (
    <group position={[0, 0, -76]}>
      {/* Outer Black Metallic Pillars */}
      <mesh position={[-7, 8, 0]}>
        <boxGeometry args={[2.5, 17, 3]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[7, 8, 0]}>
        <boxGeometry args={[2.5, 17, 3]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Top Header Lintel */}
      <mesh position={[0, 16, 0]}>
        <boxGeometry args={[16.5, 3, 3]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glowing Neon Purple Rim Edges */}
      <mesh position={[-5.6, 8, 1.55]}>
        <boxGeometry args={[0.2, 16.8, 0.1]} />
        <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
      </mesh>

      <mesh position={[5.6, 8, 1.55]}>
        <boxGeometry args={[0.2, 16.8, 0.1]} />
        <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
      </mesh>

      <mesh position={[0, 14.4, 1.55]}>
        <boxGeometry args={[11.4, 0.2, 0.1]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={2.5} />
      </mesh>

      {/* Sealed Purple Energy Forcefield Barrier */}
      <mesh position={[0, 7.5, 0]}>
        <planeGeometry args={[11.5, 14]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.5} side={THREE.DoubleSide} wireframe />
      </mesh>

      {/* 3D Label */}
      <Text position={[0, 18, 0]} fontSize={0.8} color="#A855F7" anchorX="center">
        Journey Continues
      </Text>
      <Text position={[0, 7.5, 0.2]} fontSize={0.4} color="#EC4899" anchorX="center">
        [ LOCKED GATEWAY ]
      </Text>
    </group>
  );
};
