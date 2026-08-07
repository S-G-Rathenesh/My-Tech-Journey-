'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Grid, Sliders, Sparkles, Compass } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface LandingHeroProps {
  onStart: () => void;
  onOpenSettings: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart, onOpenSettings }) => {
  const router = useRouter();
  const startBtnRef = useRef<HTMLButtonElement>(null);

  // Focus Start button automatically for instant keyboard navigation
  useEffect(() => {
    startBtnRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      audioManager.playZoneChime();
      onStart();
    }
  };

  return (
    <div
      className="relative z-10 w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 md:p-12 font-sans select-none"
      onKeyDown={handleKeyDown}
    >
      {/* Top Header Tag */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center space-x-2.5 text-xs font-bold text-cyan-400 tracking-widest glass-panel px-4 py-2 rounded-xl border border-cyan-500/30">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>E'XPLOREME ARCHITECTURE</span>
        </div>

        <div className="text-xs font-semibold text-purple-300/80 tracking-widest hidden sm:flex items-center space-x-2">
          <Compass className="w-3.5 h-3.5 text-pink-400" />
          <span>CYBER EXPERIENCE</span>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="flex flex-col items-center text-center max-w-4xl my-auto">
        {/* Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-pink-500 tracking-tight leading-none mb-3 text-glow-purple">
          E'xploreMe
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-cyan-300 tracking-wider mb-4 text-glow-cyan">
          The Path I've Traveled
        </h2>

        {/* Tagline */}
        <p className="text-sm sm:text-base md:text-lg text-purple-200/90 max-w-xl font-medium leading-relaxed mb-2">
          Are you ready to walk the path I've traveled?
        </p>

        {/* Prompt */}
        <p className="text-xs sm:text-sm font-bold text-pink-400 tracking-widest uppercase mb-10 animate-pulse">
          Press START to begin your journey.
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* 1. START Button */}
          <button
            ref={startBtnRef}
            onClick={() => {
              audioManager.playZoneChime();
              onStart();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 text-white font-extrabold text-sm sm:text-base uppercase tracking-widest flex items-center justify-center space-x-3 shadow-cyber-purple hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-400/80 active:scale-95"
          >
            <Play className="w-5 h-5 text-white fill-white" />
            <span>START</span>
          </button>

          {/* 2. Portfolio Mode Button */}
          <button
            onClick={() => {
              audioManager.playClick();
              router.push('/portfolio');
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-panel hover:bg-purple-900/60 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center space-x-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95 border border-purple-500/40"
          >
            <Grid className="w-4 h-4 text-cyan-400" />
            <span>Portfolio Mode</span>
          </button>

          {/* 3. Settings Button */}
          <button
            onClick={() => {
              audioManager.playClick();
              onOpenSettings();
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel hover:bg-purple-900/60 text-purple-300 hover:text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95 border border-purple-500/40"
          >
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Footer Navigation Info */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] text-purple-300/70 border-t border-purple-500/20 pt-4">
        <div>
          Navigation: <span className="text-cyan-300 font-bold">Tab</span> to cycle • <span className="text-cyan-300 font-bold">Enter</span> to START
        </div>
        <div>
          Version 1.0 • Cyber Purple Theme
        </div>
      </div>
    </div>
  );
};
