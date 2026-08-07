'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface FuturePortalProps {
  highlightedId?: string | null;
}

export const FuturePortal: React.FC<FuturePortalProps> = ({ highlightedId }) => {
  const vortexRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (vortexRef.current) {
      vortexRef.current.rotation.z = state.clock.getElapsedTime() * 1.5;
    }
  });

  const futureProjects = [
    { id: 'inventory-management', title: 'Inventory SaaS', pos: [-4, 0, -22] as [number, number, number] },
    { id: 'fillpill', title: 'FillPill Health', pos: [0, 0, -26] as [number, number, number] },
    { id: 'photographic-memory-game', title: '3D Memory Game', pos: [4, 0, -22] as [number, number, number] },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* Central Stargate Vortex Portal Ring */}
      <group position={[0, 4, -25]}>
        <mesh ref={vortexRef}>
          <torusGeometry args={[3.5, 0.2, 16, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#A855F7"
            emissiveIntensity={2.5}
            wireframe
          />
        </mesh>

        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[3.2, 32]} />
          <meshBasicMaterial color="#0B0B14" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>

        <Text position={[0, 4.5, 0]} fontSize={0.7} color="#8B5CF6" anchorX="center">
          FUTURE GATEWAY
        </Text>
        <Text position={[0, 3.8, 0]} fontSize={0.35} color="#06B6D4" anchorX="center">
          Upcoming Innovations in R&D
        </Text>
      </group>

      {/* 3 Future Project Pedestals */}
      {futureProjects.map((p) => {
        const isSelected = highlightedId === p.id;
        return (
          <group key={p.id} position={p.pos}>
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.9, 1.1, 1.4, 16]} />
              <meshStandardMaterial
                color={isSelected ? "#8B5CF6" : "#0F0C1E"}
                emissive={isSelected ? "#8B5CF6" : "#000000"}
                emissiveIntensity={isSelected ? 1 : 0}
              />
            </mesh>

            {/* Glowing Orb */}
            <mesh position={[0, 2, 0]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshStandardMaterial
                color="#8B5CF6"
                emissive="#A855F7"
                emissiveIntensity={isSelected ? 2.5 : 1}
              />
            </mesh>

            <Text position={[0, 2.8, 0]} fontSize={0.3} color={isSelected ? "#EC4899" : "#8B5CF6"}>
              {p.title}
            </Text>
            {isSelected && (
              <Text position={[0, 1.5, 0]} fontSize={0.25} color="#EC4899">
                [ PRESS E / TAP ]
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
};
