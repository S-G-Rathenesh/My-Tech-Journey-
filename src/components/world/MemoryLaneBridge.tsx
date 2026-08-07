'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MemoryStone } from './MemoryStone';
import { EndGateway } from './EndGateway';
import { HolographicEchoes } from './HolographicEchoes';
import { EnvironmentalProps } from './EnvironmentalProps';

interface MemoryLaneBridgeProps {
  playerPos: [number, number, number];
  onStoneActivate: (id: string, text: string) => void;
  onStoneDeactivate: (id: string) => void;
}

export const MemoryLaneBridge: React.FC<MemoryLaneBridgeProps> = ({
  playerPos,
  onStoneActivate,
  onStoneDeactivate,
}) => {
  const debrisRef = useRef<THREE.InstancedMesh>(null);

  const memoryStonesData = [
    { id: 'stone-1', text: 'Curiosity became code.', pos: [0, 0, -28] as [number, number, number] },
    { id: 'stone-2', text: 'Every challenge taught something new.', pos: [0, 0, -40] as [number, number, number] },
    { id: 'stone-3', text: 'Dreams became projects.', pos: [0, 0, -52] as [number, number, number] },
    { id: 'stone-4', text: 'The journey continues.', pos: [0, 0, -64] as [number, number, number] },
  ];

  // Floating Cyber Debris Particle Nodes
  const debrisCount = 40;
  const debris = useMemo(() => {
    const temp = [];
    for (let i = 0; i < debrisCount; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 15 - 5;
      const z = -18 - Math.random() * 60;
      const speed = Math.random() * 0.4 + 0.1;
      temp.push({ x, y, z, speed, initialY: y });
    }
    return temp;
  }, [debrisCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!debrisRef.current) return;
    const time = state.clock.getElapsedTime();

    debris.forEach((d, i) => {
      d.y = d.initialY + Math.sin(time * d.speed + i) * 0.8;
      dummy.position.set(d.x, d.y, d.z);
      dummy.scale.setScalar(0.12 + Math.sin(time + i) * 0.04);
      dummy.updateMatrix();
      debrisRef.current?.setMatrixAt(i, dummy.matrix);
    });

    debrisRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Floating Black Metallic Bridge Pathway (Z: -18 to -76) */}
      <mesh position={[0, -0.6, -47]}>
        <boxGeometry args={[5.5, 1.0, 58]} />
        <meshStandardMaterial color="#0B0B14" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Emissive Glowing Purple Rim Edges */}
      <mesh position={[-2.75, 0.01, -47]}>
        <boxGeometry args={[0.2, 0.2, 58]} />
        <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
      </mesh>

      <mesh position={[2.75, 0.01, -47]}>
        <boxGeometry args={[0.2, 0.2, 58]} />
        <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={2.5} />
      </mesh>

      {/* Deep Purple Energy Abyss Surface Below Bridge */}
      <mesh position={[0, -12, -47]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#1A0C38" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Cyber Debris Mesh */}
      <instancedMesh ref={debrisRef} args={[undefined, undefined, debrisCount]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#A855F7" emissive="#8B5CF6" emissiveIntensity={1.5} wireframe />
      </instancedMesh>

      {/* 3D Spatial Memory Echoes & Storytelling Props */}
      <HolographicEchoes playerPos={playerPos} />
      <EnvironmentalProps />

      {/* 4 Interactive Memory Stones */}
      {memoryStonesData.map((s) => (
        <MemoryStone
          key={s.id}
          id={s.id}
          text={s.text}
          position={s.pos}
          playerPos={playerPos}
          onActivate={onStoneActivate}
          onDeactivate={onStoneDeactivate}
        />
      ))}

      {/* Massive Locked Gateway at End of Memory Lane */}
      <EndGateway />
    </group>
  );
};
