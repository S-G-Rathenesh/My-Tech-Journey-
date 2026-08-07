'use client';

import React from 'react';

export const EnvironmentalProps: React.FC = () => {
  return (
    <group>
      {/* 1. Old Mechanical Keyboard ([-2.3, 0.05, -26]) */}
      <group position={[-2.3, 0.05, -26]} rotation={[0, 0.2, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.4]} />
          <meshStandardMaterial color="#0B0B14" roughness={0.6} metalness={0.4} />
        </mesh>
        {/* Keycap grid lines */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.82, 0.03, 0.34]} />
          <meshStandardMaterial color="#1E1B4B" emissive="#A855F7" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* 2. Ceramic Coffee Mug ([2.3, 0.15, -36]) */}
      <group position={[2.3, 0.15, -36]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#0B0B14" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Coffee Fill */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 16]} />
          <meshStandardMaterial color="#2B1506" roughness={0.1} />
        </mesh>
      </group>

      {/* 3. Open Developer Notebook ([-2.3, 0.05, -48]) */}
      <group position={[-2.3, 0.05, -48]} rotation={[0, -0.3, 0]}>
        <mesh position={[-0.22, 0.03, 0]}>
          <boxGeometry args={[0.4, 0.04, 0.55]} />
          <meshStandardMaterial color="#1E1B4B" roughness={0.8} />
        </mesh>
        <mesh position={[0.22, 0.03, 0]}>
          <boxGeometry args={[0.4, 0.04, 0.55]} />
          <meshStandardMaterial color="#1E1B4B" roughness={0.8} />
        </mesh>
        {/* Code lines */}
        <mesh position={[0.22, 0.05, 0]}>
          <boxGeometry args={[0.32, 0.01, 0.4]} />
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* 4. Broken Cyber Terminal Monitor ([2.3, 0.35, -60]) */}
      <group position={[2.3, 0.35, -60]} rotation={[0, -0.4, 0]}>
        {/* Monitor Base */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.5, 0.06, 0.4]} />
          <meshStandardMaterial color="#0B0B14" metalness={0.8} />
        </mesh>
        {/* Screen Frame */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.1]} />
          <meshStandardMaterial color="#0B0B14" metalness={0.8} />
        </mesh>
        {/* Cracked Display */}
        <mesh position={[0, 0.45, 0.06]}>
          <planeGeometry args={[0.7, 0.5]} />
          <meshStandardMaterial color="#1E103C" emissive="#A855F7" emissiveIntensity={0.4} wireframe />
        </mesh>
      </group>

      {/* 5. Glowing Circuit Board Panel ([-2.3, 0.1, -68]) */}
      <group position={[-2.3, 0.1, -68]} rotation={[0, 0.15, 0]}>
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.8]} />
          <meshStandardMaterial color="#070710" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.52, 0.01, 0.72]} />
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={1.2} wireframe />
        </mesh>
      </group>
    </group>
  );
};
