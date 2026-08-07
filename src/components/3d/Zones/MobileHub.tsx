'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface MobileHubProps {
  highlightedId?: string | null;
}

export const MobileHub: React.FC<MobileHubProps> = ({ highlightedId }) => {
  const phone1Ref = useRef<THREE.Mesh>(null);
  const phone2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (phone1Ref.current) phone1Ref.current.position.y = 2.2 + Math.sin(t * 2) * 0.15;
    if (phone2Ref.current) phone2Ref.current.position.y = 2.2 + Math.cos(t * 2) * 0.15;
  });

  const mobileApps = [
    { id: 'wake-up-darling', title: 'Wake-up Darling', pos: [-22, 0, 4] as [number, number, number] },
    { id: 'paalkaran', title: 'Paalkaran', pos: [-22, 0, -4] as [number, number, number] },
    { id: 'vibesync', title: 'VibeSync', pos: [-26, 0, 0] as [number, number, number] },
    { id: 'spendguard', title: 'SpendGuard', pos: [-18, 0, 0] as [number, number, number] },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* Zone Title Banner */}
      <group position={[-22, 0, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[8, 8.5, 0.3, 32]} />
          <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
        </mesh>
        <Text position={[0, 6, 0]} fontSize={0.7} color="#06B6D4" anchorX="center">
          MOBILE INNOVATION CENTER
        </Text>
        <Text position={[0, 5.3, 0]} fontSize={0.35} color="#A855F7" anchorX="center">
          Tap / Interact Pedestals to Download APKs
        </Text>
      </group>

      {/* 4 Holographic Smartphone Pedestals */}
      {mobileApps.map((app) => {
        const isSelected = highlightedId === app.id;
        return (
          <group key={app.id} position={app.pos}>
            {/* Pedestal Pillar */}
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.8, 1, 1.6, 16]} />
              <meshStandardMaterial
                color={isSelected ? "#06B6D4" : "#0F0C1E"}
                emissive={isSelected ? "#06B6D4" : "#000000"}
                emissiveIntensity={isSelected ? 0.8 : 0}
              />
            </mesh>

            {/* Floating Holographic Smartphone Frame */}
            <mesh position={[0, 2.3, 0]} rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[0.6, 1.2, 0.08]} />
              <meshStandardMaterial
                color="#06B6D4"
                emissive="#06B6D4"
                emissiveIntensity={isSelected ? 2 : 1}
                wireframe
              />
            </mesh>

            <Text position={[0, 3.2, 0]} fontSize={0.3} color={isSelected ? "#EC4899" : "#06B6D4"}>
              {app.title}
            </Text>
            {isSelected && (
              <Text position={[0, 1.9, 0]} fontSize={0.25} color="#EC4899">
                [ PRESS E / TAP ]
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
};
