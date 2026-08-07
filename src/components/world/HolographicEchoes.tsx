'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface EchoItem {
  text: string;
  pos: [number, number, number];
  color: string;
}

const ECHOS: EchoItem[] = [
  { text: 'HELLO WORLD', pos: [-3.2, 2.5, -24], color: '#A855F7' },
  { text: 'git init', pos: [3.2, 1.8, -34], color: '#8B5CF6' },
  { text: 'Compiling...', pos: [-3.5, 2.2, -44], color: '#EC4899' },
  { text: 'First Successful Build', pos: [3.5, 2.8, -54], color: '#A855F7' },
  { text: 'Every Bug Taught Something', pos: [-3.2, 2.0, -62], color: '#EC4899' },
  { text: 'Dream Bigger', pos: [3.2, 3.2, -70], color: '#F43F5E' },
];

export const HolographicEchoes: React.FC<{ playerPos: [number, number, number] }> = ({ playerPos }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      // Gentle floating bob
      child.position.y = ECHOS[i].pos[1] + Math.sin(time * 1.2 + i) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {ECHOS.map((echo, idx) => {
        // Distance check for subtle opacity breathing
        const dz = Math.abs(playerPos[2] - echo.pos[2]);
        const opacity = Math.max(0.1, 1 - Math.min(dz / 18, 1));

        return (
          <group key={idx} position={echo.pos}>
            <Text
              fontSize={0.45}
              color={echo.color}
              anchorX="center"
              anchorY="middle"
              fillOpacity={opacity * 0.85}
            >
              {echo.text}
            </Text>

            <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.4, 0.8, 16]} />
              <meshBasicMaterial color={echo.color} transparent opacity={opacity * 0.3} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
