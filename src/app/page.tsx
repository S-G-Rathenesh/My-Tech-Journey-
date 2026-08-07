'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CinematicBackground } from '@/components/landing/CinematicBackground';
import { LandingHero } from '@/components/landing/LandingHero';
import { StartLoadingSequence } from '@/components/landing/StartLoadingSequence';
import { SettingsModal } from '@/components/landing/SettingsModal';
import { audioManager } from '@/lib/audioManager';

// Dynamic SSR-disabled imports
const CinematicScene = dynamic(
  () => import('@/components/cinematic/CinematicScene').then((mod) => mod.CinematicScene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 bg-[#05050A] flex flex-col items-center justify-center text-purple-400">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-cyan-400 rounded-full animate-spin mb-4" />
        <div className="text-xs tracking-widest font-bold uppercase animate-pulse">Initializing Opening Cinematic...</div>
      </div>
    ),
  }
);

const NeonGatewayScene = dynamic(
  () => import('@/components/world/NeonGatewayScene').then((mod) => mod.NeonGatewayScene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 bg-[#05050A] flex flex-col items-center justify-center text-purple-400">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mb-4" />
        <div className="text-xs tracking-widest font-bold uppercase animate-pulse">Materializing Neon Gateway...</div>
      </div>
    ),
  }
);

export default function Home() {
  const [isStarting, setIsStarting] = useState(false);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const [isCinematicFinished, setIsCinematicFinished] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);
  const [graphicsQuality, setGraphicsQuality] = useState<'low' | 'medium' | 'high'>('high');

  const handleStart = () => {
    setIsStarting(true);
  };

  const handleLoadingComplete = () => {
    setIsLoadingFinished(true);
  };

  const handleCinematicComplete = () => {
    setIsCinematicFinished(true);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#05050A] select-none font-sans">
      {/* 1. Cinematic Background */}
      <CinematicBackground reducedMotion={motionReduced} />

      {/* 2. Landing Hero UI */}
      {!isStarting && !isCinematicFinished && (
        <LandingHero
          onStart={handleStart}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* 3. Milestone 1 START Loading Sequence */}
      {isStarting && !isLoadingFinished && (
        <StartLoadingSequence onComplete={handleLoadingComplete} />
      )}

      {/* 4. Milestone 2 3D Opening Cinematic Sequence */}
      {isLoadingFinished && !isCinematicFinished && (
        <CinematicScene onComplete={handleCinematicComplete} />
      )}

      {/* 5. Milestone 3 Neon Gateway Playable Sector */}
      {isCinematicFinished && (
        <NeonGatewayScene />
      )}

      {/* 6. System Configuration Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(audioManager.toggleMute())}
        motionReduced={motionReduced}
        onToggleMotion={() => setMotionReduced(!motionReduced)}
        graphicsQuality={graphicsQuality}
        onChangeGraphics={setGraphicsQuality}
      />
    </main>
  );
}
