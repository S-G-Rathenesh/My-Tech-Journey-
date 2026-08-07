'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface FragmentItem {
  text: string;
  pos: [number, number, number];
  color: string;
}

const FRAGMENTS: FragmentItem[] = [
  { text: 'const memory = await loadMilestones();', pos: [-5, 7, 32], color: '#A855F7' },
  { text: 'git commit 7f3a9d1', pos: [5, 4, 28], color: '#EC4899' },
  { text: 'NEXT.JS 15', pos: [-6, 3, 24], color: '#8B5CF6' },
  { text: 'FASTAPI • GEMINI AI', pos: [6, 8, 20], color: '#A855F7' },
  { text: 'FLUTTER • FIREBASE', pos: [-4, 2, 16], color: '#EC4899' },
  { text: 'sys.init(MEMORIES_ARCHIVE)', pos: [4, 6, 12], color: '#8B5CF6' },
];

export const HolographicFragments: React.FC<{ progressTime: number }> = ({ progressTime }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(progressTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {FRAGMENTS.map((item, idx) => {
        // Calculate fade opacity based on distance to camera / progressTime
        const opacity = Math.max(0, 1 - Math.abs(progressTime - (idx * 1.4 + 1)) * 0.4);

        return (
          <group key={idx} position={item.pos}>
            <Text
              fontSize={0.45}
              color={item.color}
              anchorX="center"
              anchorY="middle"
              fillOpacity={opacity}
            >
              {item.text}
            </Text>

            {/* Neural Node Sphere Frame */}
            <mesh position={[0, -0.3, 0]}>
              <octahedronGeometry args={[0.2, 0]} />
              <meshBasicMaterial
                color={item.color}
                wireframe
                transparent
                opacity={opacity * 0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
