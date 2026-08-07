'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { World } from './World';
import { Player } from './Player';
import { ExaCompanion } from './ExaCompanion';

interface SceneProps {
  onPositionUpdate: (pos: [number, number, number]) => void;
  onZoneChange: (zone: string) => void;
  onProximityProject: (projectId: string | null) => void;
  highlightedProjectId: string | null;
  playerPos: [number, number, number];
  joystickInput?: { x: number; y: number } | null;
  isMobileJumpPressed?: boolean;
  isMobileInteractPressed?: boolean;
}

export const Scene: React.FC<SceneProps> = ({
  onPositionUpdate,
  onZoneChange,
  onProximityProject,
  highlightedProjectId,
  playerPos,
  joystickInput,
  isMobileJumpPressed,
  isMobileInteractPressed,
}) => {
  return (
    <div className="w-full h-full absolute inset-0 bg-[#05050A]">
      <Canvas
        shadows
        camera={{ position: [0, 8, 12], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* Ambient & Cyber Lights */}
        <ambientLight intensity={0.4} color="#1E1B4B" />
        <directionalLight
          position={[20, 40, 20]}
          intensity={1.2}
          color="#A855F7"
          castShadow
        />
        <pointLight position={[-20, 20, -20]} intensity={1.5} color="#06B6D4" />

        {/* 3D World Landscape */}
        <World highlightedProjectId={highlightedProjectId} />

        {/* Player Avatar */}
        <Player
          onPositionUpdate={onPositionUpdate}
          onZoneChange={onZoneChange}
          onProximityProject={onProximityProject}
          joystickInput={joystickInput}
          isMobileJumpPressed={isMobileJumpPressed}
          isMobileInteractPressed={isMobileInteractPressed}
        />

        {/* EXA AI Floating Companion */}
        <ExaCompanion playerPos={playerPos} />

        {/* Cyber Post-Processing Filters */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} radialModulation={false} modulationOffset={0} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
