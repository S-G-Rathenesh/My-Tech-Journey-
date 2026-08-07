'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Milestone5CameraProps {
  isActive: boolean;
}

export const Milestone5Camera: React.FC<Milestone5CameraProps> = ({ isActive }) => {
  const { camera } = useThree();
  const startTime = useRef<number | null>(null);

  // Initial cinematic start pos
  const startPos = new THREE.Vector3(0, 8.5, -66);
  const targetGateCore = new THREE.Vector3(0, 8, -76);

  useEffect(() => {
    if (isActive && !startTime.current) {
      startTime.current = performance.now() / 1000;
    }
  }, [isActive]);

  useFrame((state) => {
    if (!isActive || !startTime.current) return;

    const elapsed = (performance.now() / 1000) - startTime.current;

    // t=0s to t=5s (Circle the gate slowly)
    if (elapsed < 5.0) {
      const angle = (elapsed / 5.0) * Math.PI * 0.5; // quarter turn
      const radius = 10;
      camera.position.x = Math.sin(angle) * radius;
      camera.position.y = 8 + Math.sin(elapsed) * 1.5;
      camera.position.z = -76 + Math.cos(angle) * radius;
      camera.lookAt(targetGateCore);
    } 
    // t=5s to t=8s (Push into the gate slowly)
    else {
      const pushProgress = Math.min((elapsed - 5.0) / 3.0, 1.0);
      
      const currentPos = new THREE.Vector3().copy(camera.position);
      const pushTarget = new THREE.Vector3(0, 8, -78); // push past the core

      camera.position.lerpVectors(currentPos, pushTarget, pushProgress * 0.05);
      camera.lookAt(0, 8, -80);
    }
  });

  return null;
};
