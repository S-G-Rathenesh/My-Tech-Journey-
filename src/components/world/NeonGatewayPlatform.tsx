'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface NeonGatewayPlatformProps {
  hasMoved: boolean;
}

export const NeonGatewayPlatform: React.FC<NeonGatewayPlatformProps> = ({ hasMoved }) => {
  const inscriptionRef = useRef<THREE.MeshStandardMaterial>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const opacityRef = useRef(1.0);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.2;
    }

    // Floor Inscription Pulse & Fade reaction upon first movement
    if (hasMoved && opacityRef.current > 0) {
      opacityRef.current = Math.max(0, opacityRef.current - delta * 0.8);
      if (inscriptionRef.current) {
        inscriptionRef.current.opacity = opacityRef.current;
        inscriptionRef.current.emissiveIntensity = opacityRef.current * 3.0;
      }
    } else if (!hasMoved && inscriptionRef.current) {
      // Gentle pulse while waiting for first movement
      inscriptionRef.current.emissiveIntensity = 1.2 + Math.sin(time * 3) * 0.6;
    }
  });

  const sealedGates = [
    { id: 'east', label: 'EAST (HALL OF MILESTONES)', pos: [18, 0, 0] as [number, number, number], rot: -Math.PI / 2 },
    { id: 'south', label: 'SOUTH (FUTURE GATEWAY)', pos: [0, 0, 18] as [number, number, number], rot: Math.PI },
    { id: 'west', label: 'WEST (MOBILE INNOVATION)', pos: [-18, 0, 0] as [number, number, number], rot: Math.PI / 2 },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Circular Floating Platform Surface (Radius: 18) */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[18, 18.5, 1.2, 64]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Emissive Glowing Purple Rim Ring */}
      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[17.4, 18.0, 64]} />
        <meshBasicMaterial color="#A855F7" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* Concentric Translucent Glass Inlay Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8, 12, 64]} />
        <meshStandardMaterial color="#1E103C" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Creative Addition: Glowing Floor Inscription */}
      <group position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          fontSize={0.65}
          color="#A855F7"
          anchorX="center"
          anchorY="middle"
        >
          "Every journey begins with a single step."
          <meshStandardMaterial
            ref={inscriptionRef}
            attach="material"
            color="#A855F7"
            emissive="#8B5CF6"
            emissiveIntensity={1.5}
            transparent
          />
        </Text>
      </group>

      {/* 4 Sealed Connection Gateways Around Edge */}
      {sealedGates.map((gate) => (
        <group key={gate.id} position={gate.pos} rotation={[0, gate.rot, 0]}>
          {/* Outer Black Arch Frame */}
          <mesh position={[-4, 4, 0]}>
            <boxGeometry args={[1.5, 9, 2]} />
            <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[4, 4, 0]}>
            <boxGeometry args={[1.5, 9, 2]} />
            <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 8.5, 0]}>
            <boxGeometry args={[9.5, 1.5, 2]} />
            <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Emissive Purple Rim Edges */}
          <mesh position={[0, 8.5, 1.05]}>
            <boxGeometry args={[9.2, 0.2, 0.1]} />
            <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
          </mesh>

          {/* Sealed Energy Forcefield Barrier */}
          <mesh position={[0, 4, 0]}>
            <planeGeometry args={[6.5, 7.5]} />
            <meshBasicMaterial color="#A855F7" transparent opacity={0.45} side={THREE.DoubleSide} wireframe />
          </mesh>

          {/* Internal Label */}
          <Text position={[0, 9.8, 0]} fontSize={0.35} color="#EC4899" anchorX="center">
            {gate.label}
          </Text>
          <Text position={[0, 4, 0.1]} fontSize={0.3} color="#A855F7" anchorX="center">
            [ SEALED FORCEFIELD ]
          </Text>
        </group>
      ))}
    </group>
  );
};
