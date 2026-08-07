'use client';

import React, { useEffect, useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface ExaNarrativeOverlayProps {
  progressTime: number; // Elapsed cinematic time (0 to 11 seconds)
}

export const ExaNarrativeOverlay: React.FC<ExaNarrativeOverlayProps> = ({ progressTime }) => {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    let currentLine: string | null = null;

    if (progressTime >= 0.5 && progressTime < 2.8) {
      currentLine = 'Initializing memory archive...';
    } else if (progressTime >= 2.8 && progressTime < 5.0) {
      currentLine = 'Recovering milestones...';
    } else if (progressTime >= 5.0 && progressTime < 7.5) {
      currentLine = 'Preparing digital journey...';
    } else if (progressTime >= 7.5 && progressTime < 9.2) {
      currentLine = 'Gateway unlocked.';
    } else if (progressTime >= 9.2 && progressTime < 11.0) {
      currentLine = 'Welcome, Explorer.';
    }

    if (currentLine !== line) {
      setLine(currentLine);
      if (currentLine) {
        audioManager.playExaChime();
      }
    }
  }, [progressTime, line]);

  if (!line) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none font-sans animate-fadeIn">
      <div className="glass-panel px-6 py-3.5 rounded-2xl border border-purple-500/50 shadow-cyber-purple flex items-center space-x-3 bg-purple-950/80 backdrop-blur-md">
        <div className="w-8 h-8 rounded-xl bg-purple-900 border border-purple-400 flex items-center justify-center shrink-0 shadow-cyber-purple">
          <Bot className="w-5 h-5 text-purple-300 animate-pulse" />
        </div>

        <div>
          <div className="text-[10px] font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" /> EXA NARRATIVE SYSTEM
          </div>
          <div className="text-sm font-extrabold text-white text-glow-purple tracking-wide">
            "{line}"
          </div>
        </div>
      </div>
    </div>
  );
};
