'use client';

import React from 'react';
import { Compass, Keyboard, TouchpadIcon } from 'lucide-react';

interface TutorialOverlayProps {
  hasMoved: boolean;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ hasMoved }) => {
  if (hasMoved) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none font-sans animate-fadeIn">
      <div className="glass-panel px-6 py-4 rounded-3xl border border-cyan-500/50 shadow-cyber-cyan text-center bg-purple-950/85 backdrop-blur-md max-w-sm">
        <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
          <Compass className="w-4 h-4 text-purple-400 animate-spin" /> EXPLORER NAVIGATION TUTORIAL
        </div>

        <div className="text-sm font-extrabold text-white mb-2 text-glow-purple">
          Use WASD or Arrow Keys to Move
        </div>

        <div className="space-y-1 text-xs text-purple-200/90 font-medium">
          <div className="flex items-center justify-center space-x-2">
            <kbd className="px-2 py-0.5 rounded bg-purple-900 border border-purple-400 text-cyan-300 font-mono text-[11px]">WASD / ARROWS</kbd>
            <span>Move</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <kbd className="px-2 py-0.5 rounded bg-purple-900 border border-purple-400 text-cyan-300 font-mono text-[11px]">SHIFT</kbd>
            <span>Sprint</span>
            <kbd className="px-2 py-0.5 rounded bg-purple-900 border border-purple-400 text-cyan-300 font-mono text-[11px]">SPACE</kbd>
            <span>Jump</span>
          </div>
          <div className="flex items-center justify-center space-x-2 pt-1 text-[11px] text-purple-300/80">
            <span>Press <strong className="text-pink-400">E</strong> to Interact • <strong className="text-pink-400">M</strong> for Map</span>
          </div>
        </div>
      </div>
    </div>
  );
};
