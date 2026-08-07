'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FuturisticGatewayProps {
  progressTime: number; // Elapsed cinematic time (0 to 11 seconds)
}

export const FuturisticGateway: React.FC<FuturisticGatewayProps> = ({ progressTime }) => {
  const pillarGroupRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // 1. Self-Assembling Assembly Phase (0s to 3.5s)
    let assembleProgress = 1.0;
    if (progressTime < 3.5) {
      assembleProgress = progressTime / 3.5;
    }

    // Ease in-out assemble factor
    const easeAssemble = Math.sin((assembleProgress * Math.PI) / 2);
    const offsetY = (1 - easeAssemble) * 10;
    const offsetX = (1 - easeAssemble) * 6;

    if (pillarGroupRef.current) {
      pillarGroupRef.current.position.y = offsetY;
    }

    // 2. Gate Opening Mechanical Slide (3.5s to 8.5s)
    let openDistance = 0;
    if (progressTime > 3.5) {
      const openProgress = Math.min((progressTime - 3.5) / 5.0, 1.0);
      const easedProgress = 1 - Math.pow(1 - openProgress, 3);
      openDistance = easedProgress * 8.5;
    }

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = -openDistance - offsetX;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = openDistance + offsetX;
    }

    // 3. Energy Core Ignition & Pulsation (Primary Cyber Purple Identity)
    let energyIntensity = 0.5;
    if (progressTime < 3.5) {
      energyIntensity = 0.5 + (progressTime / 3.5) * 2.5;
    } else {
      energyIntensity = 3.0 + Math.sin(progressTime * 4) * 0.6;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = progressTime * 0.8;
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = energyIntensity;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = progressTime * 1.2;
      ring1Ref.current.rotation.x = progressTime * 0.5;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -progressTime * 1.5;
      ring2Ref.current.rotation.y = progressTime * 0.8;
    }
  });

  return (
    <group position={[0, 4, 0]}>
      {/* Pillar Group for Self-Assembly */}
      <group ref={pillarGroupRef}>
        {/* Outer Black Metallic Architectural Archway Pillars */}
        <mesh position={[-11, 0, 0]}>
          <boxGeometry args={[4, 26, 6]} />
          <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[11, 0, 0]}>
          <boxGeometry args={[4, 26, 6]} />
          <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Top Lintel Arch Header */}
        <mesh position={[0, 12, 0]}>
          <boxGeometry args={[26, 4, 6]} />
          <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Glowing Cyber Purple & Magenta Rim Edges */}
        <mesh position={[-9.1, 0, 0]}>
          <boxGeometry args={[0.3, 25.8, 6.2]} />
          <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.8} />
        </mesh>

        <mesh position={[9.1, 0, 0]}>
          <boxGeometry args={[0.3, 25.8, 6.2]} />
          <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.8} />
        </mesh>

        <mesh position={[0, 10.1, 0]}>
          <boxGeometry args={[25.8, 0.3, 6.2]} />
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={2.8} />
        </mesh>
      </group>

      {/* Mechanical Gate Doors */}
      <group ref={leftDoorRef} position={[0, 0, 0]}>
        <mesh position={[-4.5, 0, 0]}>
          <boxGeometry args={[8.8, 20, 2.5]} />
          <meshStandardMaterial color="#070710" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[-4.5, 0, 1.3]}>
          <boxGeometry args={[8.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
        </mesh>
      </group>

      <group ref={rightDoorRef} position={[0, 0, 0]}>
        <mesh position={[4.5, 0, 0]}>
          <boxGeometry args={[8.8, 20, 2.5]} />
          <meshStandardMaterial color="#070710" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[4.5, 0, 1.3]}>
          <boxGeometry args={[8.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* Central Floating Energy Core Orb (Primary Purple Identity) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#8B5CF6"
          emissiveIntensity={2.0}
          wireframe
        />
      </mesh>

      {/* Rotating Energy Conduit Rings */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[3.6, 0.08, 16, 64]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={2.5} />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[4.8, 0.06, 16, 64]} />
        <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
      </mesh>

      {/* Primary Cyber Purple Lights */}
      <pointLight color="#A855F7" intensity={5} distance={30} position={[0, 0, 0]} />
      <pointLight color="#EC4899" intensity={4} distance={25} position={[0, 4, 0]} />
    </group>
  );
};
