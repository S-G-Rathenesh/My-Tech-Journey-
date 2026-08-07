'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface StartLoadingSequenceProps {
  onComplete: () => void;
}

export const StartLoadingSequence: React.FC<StartLoadingSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');
  const [isFadingToBlack, setIsFadingToBlack] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;

        if (next < 35) {
          setStatusText('Initializing...');
        } else if (next >= 35 && next < 70) {
          setStatusText('Loading Memories...');
        } else if (next >= 70 && next < 100) {
          setStatusText('Preparing World...');
        } else if (next >= 100) {
          clearInterval(interval);
          setIsFadingToBlack(true);
          setTimeout(() => {
            onComplete();
          }, 1200);
          return 100;
        }

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#05050A] text-white transition-opacity duration-1000 ${
        isFadingToBlack ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Glowing Cyber Spinner */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-purple-900 border-t-purple-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-cyan-950 border-t-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <Terminal className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>

        {/* Status Phase Text */}
        <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" /> SYSTEM INITIALIZATION
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-glow-purple mb-6">
          {statusText}
        </h2>

        {/* Progress Bar Container */}
        <div className="w-full h-3 rounded-full bg-purple-950/80 border border-purple-500/40 p-0.5 mb-3 overflow-hidden shadow-cyber-purple">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-pink-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="text-xs font-mono font-bold text-purple-300">
          {progress}% COMPLETED
        </div>
      </div>
    </div>
  );
};
