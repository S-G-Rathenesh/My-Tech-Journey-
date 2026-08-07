'use client';

import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicCameraProps {
  progressTime: number; // Elapsed cinematic time (0 to 11 seconds)
}

export const CinematicCamera: React.FC<CinematicCameraProps> = ({ progressTime }) => {
  const { camera } = useThree();

  useFrame(() => {
    const maxTime = 10.5;
    const t = Math.min(progressTime / maxTime, 1.0);

    // Smoothstep easing formula: 3*t^2 - 2*t^3
    const smoothT = t * t * (3 - 2 * t);

    // Curved Cinematic 3D Bezier Arc Trajectory
    // Arc X pan: curves gently outwards to x = 3.8 and back to center 0 as it enters the gate
    const currentX = Math.sin(smoothT * Math.PI) * 3.8;

    // Y arc: starts at y = 6.5, dips slightly to 4.2 during entrance
    const currentY = 6.5 - Math.sin(smoothT * Math.PI * 0.8) * 2.3;

    // Z forward fly-through from z = 48 to z = -18
    const currentZ = THREE.MathUtils.lerp(48, -18, smoothT);

    camera.position.set(currentX, currentY, currentZ);

    // Smooth look-at target focused on the gate's central energy core [0, 4, 0]
    camera.lookAt(0, 4, 0);
  });

  return null;
};
