'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CyberParticles: React.FC = () => {
  const count = 300;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 15 + 0.5;
      const z = (Math.random() - 0.5) * 100;
      const speed = Math.random() * 0.5 + 0.2;
      temp.push({ x, y, z, speed, initialY: y });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      p.y = p.initialY + Math.sin(time * p.speed + i) * 0.5;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(0.08 + Math.sin(time + i) * 0.03);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color="#A855F7" transparent opacity={0.6} />
    </instancedMesh>
  );
};
