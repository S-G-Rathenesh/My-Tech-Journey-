'use client';

import React, { useEffect, useState } from 'react';
import { X, Volume2, VolumeX, Monitor, Sliders, Maximize, Check } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  motionReduced: boolean;
  onToggleMotion: () => void;
  graphicsQuality: 'low' | 'medium' | 'high';
  onChangeGraphics: (quality: 'low' | 'medium' | 'high') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isMuted,
  onToggleMute,
  motionReduced,
  onToggleMotion,
  graphicsQuality,
  onChangeGraphics,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        audioManager.playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleFullscreen = () => {
    audioManager.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fadeIn font-sans">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="glass-panel w-full max-w-md rounded-3xl p-6 md:p-8 border-2 border-purple-500/50 shadow-cyber-purple relative text-white"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            audioManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2.5 rounded-2xl glass-panel hover:bg-purple-900/60 text-purple-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close Settings"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>SYSTEM CONFIGURATION</span>
          </div>
          <h2 id="settings-title" className="text-2xl font-extrabold text-white text-glow-purple">
            Preferences & Settings
          </h2>
        </div>

        <div className="space-y-5">
          {/* Audio Controls */}
          <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-500/20">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
              Audio Atmosphere
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sound Effects & Synth</span>
              <button
                onClick={() => {
                  audioManager.playClick();
                  onToggleMute();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 border transition-all ${
                  !isMuted
                    ? 'bg-cyan-900/60 border-cyan-400 text-cyan-300 shadow-cyber-cyan'
                    : 'bg-purple-950/60 border-purple-500/30 text-purple-400'
                }`}
              >
                {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
                <span>{!isMuted ? 'ENABLED' : 'MUTED'}</span>
              </button>
            </div>
          </div>

          {/* Graphics Quality */}
          <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-500/20">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
              Graphics Target
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    audioManager.playClick();
                    onChangeGraphics(q);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                    graphicsQuality === q
                      ? 'bg-purple-600 border-purple-400 text-white shadow-cyber-purple'
                      : 'bg-purple-950/40 border-purple-500/20 text-purple-300 hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Motion Reduction */}
          <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Reduce Motion</div>
                <div className="text-[11px] text-purple-300/70">Disable background particles & lightning</div>
              </div>
              <button
                onClick={() => {
                  audioManager.playClick();
                  onToggleMotion();
                }}
                className={`w-12 h-6 rounded-full p-1 border transition-all ${
                  motionReduced ? 'bg-purple-600 border-purple-400' : 'bg-purple-950/60 border-purple-500/30'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    motionReduced ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Fullscreen Desktop Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-full py-3 rounded-2xl glass-panel hover:bg-purple-900/60 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all border border-cyan-500/30"
          >
            <Maximize className="w-4 h-4" />
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
