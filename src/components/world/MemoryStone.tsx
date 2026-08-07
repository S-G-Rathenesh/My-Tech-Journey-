'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { audioManager } from '@/lib/audioManager';

interface MemoryStoneProps {
  id: string;
  text: string;
  position: [number, number, number];
  playerPos: [number, number, number];
  onActivate: (id: string, text: string) => void;
  onDeactivate: (id: string) => void;
}

export const MemoryStone: React.FC<MemoryStoneProps> = ({
  id,
  text,
  position,
  playerPos,
  onActivate,
  onDeactivate,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [isActive, setIsActive] = useState(false);

  // Proximity Distance Check
  useFrame(() => {
    const dx = playerPos[0] - position[0];
    const dz = playerPos[2] - position[2];
    const distance = Math.sqrt(dx * dx + dz * dz);

    const isNearby = distance < 3.8;

    if (isNearby && !isActive) {
      setIsActive(true);
      audioManager.playZoneChime();
      onActivate(id, text);
    } else if (!isNearby && isActive) {
      setIsActive(false);
      onDeactivate(id);
    }

    if (materialRef.current) {
      const targetEmissive = isActive ? 2.5 : 0.4;
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        targetEmissive,
        0.1
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += isActive ? 0.02 : 0.005;
    }
  });

  return (
    <group position={position}>
      {/* Stone Pedestal Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.8, 16]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Floating Rotating Monolith Memory Stone */}
      <mesh ref={meshRef} position={[0, 2.0, 0]}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          ref={materialRef}
          color={isActive ? "#A855F7" : "#0B0B14"}
          emissive={isActive ? "#8B5CF6" : "#A855F7"}
          emissiveIntensity={0.4}
          wireframe={!isActive}
        />
      </mesh>

      {/* Floating 3D Holographic Text (Activates on proximity) */}
      {isActive && (
        <group position={[0, 3.4, 0]}>
          <Text
            fontSize={0.45}
            color="#A855F7"
            anchorX="center"
            anchorY="middle"
          >
            "{text}"
          </Text>
          <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 1.2, 32]} />
            <meshBasicMaterial color="#EC4899" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Light Source */}
      <pointLight
        color={isActive ? "#EC4899" : "#A855F7"}
        intensity={isActive ? 3 : 0.8}
        distance={6}
        position={[0, 2, 0]}
      />
    </group>
  );
};
