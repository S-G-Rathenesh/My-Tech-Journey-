'use client';

import React from 'react';
import { Volume2, VolumeX, Bot, Compass, Shield, Terminal, ArrowUpRight } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface HUDOverlayProps {
  currentZone: string;
  playerPos: [number, number, number];
  proximityProjectId: string | null;
  onOpenExaChat: () => void;
  onOpenProjectModal: (id: string) => void;
  onOpenContactModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  currentZone,
  playerPos,
  proximityProjectId,
  onOpenExaChat,
  onOpenProjectModal,
  onOpenContactModal,
  isMuted,
  onToggleMute,
}) => {
  // Convert playerPos [-50 to 50] to Radar MiniMap [0% to 100%]
  const radarX = Math.min(Math.max(((playerPos[0] + 50) / 100) * 100, 5), 95);
  const radarY = Math.min(Math.max(((playerPos[2] + 55) / 90) * 100, 5), 95);

  const handleInteractClick = () => {
    if (!proximityProjectId) return;
    audioManager.playClick();
    if (proximityProjectId === 'contact-nexus') {
      onOpenContactModal();
    } else {
      onOpenProjectModal(proximityProjectId);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-4 md:p-6 font-sans">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        {/* Left: Zone Indicator */}
        <div className="pointer-events-auto flex items-center space-x-3 glass-panel px-4 py-2 rounded-xl">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-ping" />
          <div>
            <div className="text-xs uppercase tracking-widest text-purple-300 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> ZONE MONITOR
            </div>
            <div className="text-base font-bold text-white text-glow-purple">
              {currentZone}
            </div>
          </div>
        </div>

        {/* Center: System Header */}
        <div className="hidden md:flex flex-col items-center">
          <div className="text-sm font-extrabold tracking-wider text-cyan-400 text-glow-cyan">
            E'XPLOREME v1.0
          </div>
          <div className="text-[10px] tracking-widest text-purple-300/70">
            3D CYBER PORTFOLIO WORLD
          </div>
        </div>

        {/* Right Controls: Audio & EXA Guide */}
        <div className="pointer-events-auto flex items-center space-x-3">
          {/* Audio Toggle Button */}
          <button
            onClick={() => {
              audioManager.playClick();
              onToggleMute();
            }}
            className="glass-panel p-2.5 rounded-xl hover:border-purple-400 text-purple-300 hover:text-white transition-all"
            title={isMuted ? 'Unmute Audio Synthesizer' : 'Mute Audio Synthesizer'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-cyan-400 animate-pulse" />}
          </button>

          {/* EXA AI Guide Button */}
          <button
            onClick={() => {
              audioManager.playExaChime();
              onOpenExaChat();
            }}
            className="glass-panel px-3.5 py-2 rounded-xl hover:border-cyan-400 text-cyan-300 hover:text-white transition-all flex items-center space-x-2 group"
          >
            <Bot className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold tracking-wider hidden sm:inline">ASK EXA AI</span>
          </button>
        </div>
      </div>

      {/* Proximity Interaction Prompt Banner */}
      {proximityProjectId && (
        <div className="pointer-events-auto self-center my-auto">
          <button
            onClick={handleInteractClick}
            className="glass-panel px-6 py-3.5 rounded-2xl border-2 border-purple-500 shadow-cyber-purple hover:scale-105 transition-all flex items-center space-x-3 bg-purple-950/40 animate-pulse"
          >
            <Terminal className="w-6 h-6 text-pink-400" />
            <div className="text-left">
              <div className="text-xs font-bold text-pink-400 uppercase tracking-widest">
                [ INTERACTION READY ]
              </div>
              <div className="text-sm font-extrabold text-white flex items-center gap-1">
                Press [ E ] or Tap to Inspect <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Bottom Controls Footer Bar */}
      <div className="flex items-end justify-between">
        {/* Left Footer: Desktop Keyboard Controls Info */}
        <div className="hidden sm:block pointer-events-auto glass-panel px-3.5 py-2.5 rounded-xl text-xs text-purple-200/80">
          <div className="font-bold text-cyan-400 mb-1 text-[11px] tracking-wider uppercase">
            CONTROLS GUIDE
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span><kbd className="px-1.5 py-0.5 bg-purple-900/60 rounded text-purple-300 border border-purple-500/40">WASD</kbd> Move</span>
            <span><kbd className="px-1.5 py-0.5 bg-purple-900/60 rounded text-purple-300 border border-purple-500/40">SHIFT</kbd> Sprint</span>
            <span><kbd className="px-1.5 py-0.5 bg-purple-900/60 rounded text-purple-300 border border-purple-500/40">SPACE</kbd> Jump</span>
            <span><kbd className="px-1.5 py-0.5 bg-purple-900/60 rounded text-purple-300 border border-purple-500/40">E</kbd> Interact</span>
          </div>
        </div>

        {/* Right Footer: Radar MiniMap */}
        <div className="pointer-events-auto glass-panel p-2.5 rounded-2xl flex flex-col items-center">
          <div className="text-[10px] font-bold text-purple-300 mb-1 flex items-center gap-1">
            <Shield className="w-3 h-3 text-cyan-400" /> RADAR MINIMAP
          </div>
          <div className="relative w-28 h-28 rounded-xl bg-purple-950/80 border border-purple-500/40 overflow-hidden">
            {/* Grid Radar Lines */}
            <div className="absolute inset-0 border-r border-b border-purple-500/20" />
            <div className="absolute left-1/2 top-0 bottom-0 border-r border-purple-500/30" />
            <div className="absolute top-1/2 left-0 right-0 border-b border-purple-500/30" />

            {/* Radar Sweeper */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin opacity-40" />

            {/* Player Marker Dot */}
            <div
              className="absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-cyan-400 border border-white shadow-cyber-cyan transition-all duration-100"
              style={{
                left: `${radarX}%`,
                top: `${radarY}%`,
              }}
            />

            {/* Zone Markers */}
            {/* Main Plaza */}
            <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-purple-400 opacity-60" />
            {/* AI Lab */}
            <div className="absolute left-1/2 top-2 w-1.5 h-1.5 -ml-0.75 rounded-full bg-purple-400 opacity-60" />
            {/* Mobile Hub */}
            <div className="absolute left-3 top-1/2 w-1.5 h-1.5 -mt-0.75 rounded-full bg-cyan-400 opacity-60" />
            {/* Achievement Hall */}
            <div className="absolute right-3 top-1/2 w-1.5 h-1.5 -mt-0.75 rounded-full bg-pink-400 opacity-60" />
            {/* Future Portal */}
            <div className="absolute left-1/2 bottom-5 w-1.5 h-1.5 -ml-0.75 rounded-full bg-purple-400 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
};
