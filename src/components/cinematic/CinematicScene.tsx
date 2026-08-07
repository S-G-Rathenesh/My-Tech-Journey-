'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { FuturisticGateway } from './FuturisticGateway';
import { CinematicCamera } from './CinematicCamera';
import { HolographicFragments } from './HolographicFragments';
import { ExaNarrativeOverlay } from './ExaNarrativeOverlay';
import { audioManager } from '@/lib/audioManager';

interface CinematicSceneProps {
  onComplete: () => void;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({ onComplete }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWhiteFlash, setIsWhiteFlash] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start synthesized ambient space audio & energy soundscape
    audioManager.startCinematicSoundscape();

    const startTime = Date.now();
    const interval = setInterval(() => {
      const seconds = (Date.now() - startTime) / 1000;
      setElapsedTime(seconds);

      // Trigger Bright White Flash transition at ~9.2s when camera reaches gate center
      if (seconds >= 9.2 && !isWhiteFlash) {
        setIsWhiteFlash(true);
      }

      // Fade to black at 10.2s
      if (seconds >= 10.2 && !isFadingOut) {
        setIsFadingOut(true);
      }

      // Complete cinematic sequence at 11.2 seconds
      if (seconds >= 11.2) {
        clearInterval(interval);
        audioManager.stopCinematicAudio();
        onComplete();
      }
    }, 30);

    return () => {
      clearInterval(interval);
      audioManager.stopCinematicAudio();
    };
  }, [onComplete, isWhiteFlash, isFadingOut]);

  return (
    <div className="fixed inset-0 z-50 bg-[#05050A] select-none font-sans">
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 6.5, 48], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* Deep Space Fog & Primary Purple Lights */}
        <fog attach="fog" args={['#05050A', 10, 75]} />
        <ambientLight intensity={0.4} color="#1E1B4B" />
        <directionalLight position={[10, 30, 20]} intensity={1.8} color="#A855F7" />
        <pointLight position={[-15, 20, -15]} intensity={2.0} color="#EC4899" />

        {/* Floating 3D Holographic Code & Memory Fragments */}
        <HolographicFragments progressTime={elapsedTime} />

        {/* Self-Assembling Gigantic Gateway */}
        <FuturisticGateway progressTime={elapsedTime} />

        {/* Curved 3D Bezier Arc Camera Trajectory */}
        <CinematicCamera progressTime={elapsedTime} />

        {/* Cyber Postprocessing Bloom & Chromatic Aberration */}
        <EffectComposer>
          <Bloom intensity={2.0} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0018, 0.0018)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>

      {/* EXA Voice Narrative Subtitle Drawer */}
      <ExaNarrativeOverlay progressTime={elapsedTime} />

      {/* Bright White Flash Memory Transition Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-700 ${
          isWhiteFlash && !isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Final Fade to Black Transition */}
      <div
        className={`fixed inset-0 z-50 bg-[#05050A] pointer-events-none transition-opacity duration-1000 ${
          isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
