'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface EndGatewayProps {
  isAwakened?: boolean;
  isOpened?: boolean;
}

export const EndGateway: React.FC<EndGatewayProps> = ({ isAwakened = false, isOpened = false }) => {
  const forcefieldRef = useRef<THREE.MeshBasicMaterial>(null);
  const coreEnergyRef = useRef<THREE.MeshStandardMaterial>(null);
  const symbolTextRef = useRef<any>(null);
  const lockTextRef = useRef<any>(null);

  useFrame((state) => {
    const delta = state.clock.getDelta();

    // Animate Ancient Symbols (Journey Continues) when Awakened
    if (symbolTextRef.current) {
      if (isAwakened) {
        symbolTextRef.current.fillOpacity = THREE.MathUtils.lerp(symbolTextRef.current.fillOpacity, 1.0, 2 * delta);
        symbolTextRef.current.color = '#FFFFFF';
      } else {
        symbolTextRef.current.fillOpacity = 0.4;
        symbolTextRef.current.color = '#A855F7';
      }
    }

    // Animate Lock Label
    if (lockTextRef.current) {
      if (isOpened) {
        lockTextRef.current.fillOpacity = THREE.MathUtils.lerp(lockTextRef.current.fillOpacity, 0, 4 * delta);
      }
    }

    // Animate Forcefield drops when Opened
    if (forcefieldRef.current) {
      if (isOpened) {
        forcefieldRef.current.opacity = THREE.MathUtils.lerp(forcefieldRef.current.opacity, 0, 3 * delta);
      } else if (isAwakened) {
        forcefieldRef.current.opacity = 0.8 + Math.sin(state.clock.getElapsedTime() * 10) * 0.2; // pulse
      }
    }

    // Animate Core Energy glow
    if (coreEnergyRef.current) {
      if (isAwakened) {
        coreEnergyRef.current.emissiveIntensity = THREE.MathUtils.lerp(coreEnergyRef.current.emissiveIntensity, 4.0, 2 * delta);
      }
    }
  });

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

      {/* Energy Core at Center (absorbs memories) */}
      <mesh position={[0, 8, 0.5]}>
        <sphereGeometry args={[isAwakened ? 1.5 : 0.5, 32, 32]} />
        <meshStandardMaterial ref={coreEnergyRef} color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={isAwakened ? 2.0 : 0.0} transparent opacity={isAwakened ? 0.9 : 0.0} />
      </mesh>

      {/* Sealed Purple Energy Forcefield Barrier */}
      <mesh position={[0, 7.5, 0]}>
        <planeGeometry args={[11.5, 14]} />
        <meshBasicMaterial ref={forcefieldRef} color="#A855F7" transparent opacity={0.5} side={THREE.DoubleSide} wireframe />
      </mesh>

      {/* 3D Label (Ancient Symbols) */}
      <Text ref={symbolTextRef} position={[0, 18, 0]} fontSize={0.8} color="#A855F7" anchorX="center" fillOpacity={0.4}>
        Journey Continues
      </Text>
      <Text ref={lockTextRef} position={[0, 7.5, 0.2]} fontSize={0.4} color="#EC4899" anchorX="center">
        [ LOCKED GATEWAY ]
      </Text>
    </group>
  );
};
