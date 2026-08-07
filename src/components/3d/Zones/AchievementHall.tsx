'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const AchievementHall: React.FC = () => {
  const trophyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  const achievements = [
    { title: 'Full-Stack Mastery', value: '100%' },
    { title: 'Mobile Apps Built', value: '5+' },
    { title: 'AI Architect', value: 'Gemini/FastAPI' },
  ];

  return (
    <group position={[22, 0, 0]}>
      {/* Zone Platform Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[7, 7.5, 0.3, 32]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
      </mesh>

      <Text position={[0, 6, 0]} fontSize={0.7} color="#EC4899" anchorX="center">
        HALL OF MILESTONES
      </Text>
      <Text position={[0, 5.3, 0]} fontSize={0.35} color="#A855F7" anchorX="center">
        Developer Milestones & Expertise
      </Text>

      {/* Floating Trophy Sculpture */}
      <group ref={trophyRef} position={[0, 3, 0]}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={2} wireframe />
        </mesh>
      </group>

      {/* Achievement Pedestals */}
      {achievements.map((item, idx) => {
        const offsetAngle = (idx * Math.PI * 2) / 3;
        const px = Math.cos(offsetAngle) * 3.8;
        const pz = Math.sin(offsetAngle) * 3.8;
        return (
          <group key={item.title} position={[px, 0, pz]}>
            <mesh position={[0, 0.8, 0]}>
              <boxGeometry args={[1.6, 1.4, 1.6]} />
              <meshStandardMaterial color="#0F0C1E" roughness={0.3} />
            </mesh>
            <Text position={[0, 2.1, 0]} fontSize={0.28} color="#EC4899" anchorX="center">
              {item.title}
            </Text>
            <Text position={[0, 1.7, 0]} fontSize={0.25} color="#06B6D4" anchorX="center">
              {item.value}
            </Text>
          </group>
        );
      })}
    </group>
  );
};
