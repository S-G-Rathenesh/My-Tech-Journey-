'use client';

import React from 'react';
import { Play, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#05050A] text-white flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden scanlines font-sans">
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 tracking-widest">
          <Sparkles className="w-4 h-4 text-cyan-400" /> E'XPLOREME v1.0
        </div>
        <div className="text-xs text-purple-300/70 tracking-widest hidden sm:block">
          NEXT.JS 15 • THREE.JS • FIREBASE
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="flex flex-col items-center text-center max-w-3xl my-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/40 text-cyan-300 text-xs font-semibold mb-6">
          <Compass className="w-4 h-4 text-pink-400 animate-spin" />
          <span>Interactive 3D Portfolio World</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-pink-500 tracking-tight leading-tight mb-4 text-glow-purple">
          E'xploreMe
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-purple-200/80 mb-8 max-w-xl font-light leading-relaxed">
          Walk freely through a cybernetic digital world. Discover AI software, mobile applications, engineering milestones, and upcoming R&D innovations.
        </p>

        {/* Press Start Button */}
        <button
          onClick={() => {
            audioManager.playZoneChime();
            onStart();
          }}
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 text-white font-extrabold text-sm sm:text-base uppercase tracking-widest flex items-center space-x-3 shadow-cyber-purple hover:scale-105 transition-all duration-300 active:scale-95"
        >
          <Play className="w-5 h-5 text-white fill-white group-hover:translate-x-1 transition-transform" />
          <span>PRESS START TO ENTER WORLD</span>
        </button>

        {/* Controls hint */}
        <div className="mt-8 text-xs text-purple-400/70 flex flex-wrap justify-center gap-4">
          <span>Desktop: <strong className="text-cyan-300">WASD / Shift / Space / E</strong></span>
          <span>Mobile: <strong className="text-cyan-300">Virtual Touch Joystick</strong></span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center space-x-2 text-[11px] text-purple-400/60">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        <span>Optimized for 60 FPS • Cyber Purple Aesthetic</span>
      </div>
    </div>
  );
};
