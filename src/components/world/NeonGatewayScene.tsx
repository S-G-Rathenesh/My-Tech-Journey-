'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { NeonGatewayPlatform } from './NeonGatewayPlatform';
import { MemoryLaneBridge } from './MemoryLaneBridge';
import { HolographicWorldLogo } from './HolographicWorldLogo';
import { PlayablePlayer } from '../player/PlayablePlayer';
import { ExaPlayableCompanion } from '../player/ExaPlayableCompanion';
import { TutorialOverlay } from '../ui/TutorialOverlay';
import { HUDOverlay } from '../ui/HUDOverlay';
import { MobileControls } from '../ui/MobileControls';
import { Bot, Sparkles } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';
import { Milestone5Camera } from '../cinematic/Milestone5Camera';

export const NeonGatewayScene: React.FC = () => {
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0.5, 0]);
  const [hasMoved, setHasMoved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStoneText, setActiveStoneText] = useState<string | null>(null);

  // Mobile Controller State
  const [joystickInput, setJoystickInput] = useState<{ x: number; y: number } | null>(null);
  const [isMobileJumpPressed, setIsMobileJumpPressed] = useState(false);

  // Milestone 5 Orchestration State
  const [m5State, setM5State] = useState<{
    phase: number; // 0 = idle, 1 = triggered, 2 = memories travel, 3 = gate opens, 4 = camera push, 5 = fade white
    isLocked: boolean;
    exaDialog: string | null;
  }>({ phase: 0, isLocked: false, exaDialog: null });

  const lastPosRef = useRef<[number, number, number]>([0, 0.5, 0]);
  const m5TriggeredRef = useRef(false);

  // Milestone 5 Trigger Logic (Z <= -72)
  useEffect(() => {
    if (playerPos[2] <= -72 && !m5TriggeredRef.current) {
      m5TriggeredRef.current = true;
      startMilestone5Sequence();
    }
  }, [playerPos]);

  const startMilestone5Sequence = () => {
    // Lock player, start sequence
    setM5State({ phase: 1, isLocked: true, exaDialog: null });
    audioManager.startMilestone5Cinematic();

    // t=1s: EXA Dialogue 1
    setTimeout(() => {
      setM5State(s => ({ ...s, exaDialog: "You've reached the end of the memories..." }));
    }, 1000);

    // t=3s: EXA Dialogue 2
    setTimeout(() => {
      setM5State(s => ({ ...s, exaDialog: "But every memory becomes the foundation for creation." }));
    }, 4000);

    // t=6s: EXA Dialogue 3
    setTimeout(() => {
      setM5State(s => ({ ...s, exaDialog: "Let's continue." }));
    }, 6000);

    // t=7s: Phase 2 (Memories Travel)
    setTimeout(() => {
      setM5State(s => ({ ...s, phase: 2, exaDialog: null }));
    }, 7000);

    // t=13s: Phase 3 (Gate Opens / Awakens)
    setTimeout(() => {
      setM5State(s => ({ ...s, phase: 3 }));
    }, 13000);

    // t=16s: Phase 4 (Camera Takes Control)
    setTimeout(() => {
      setM5State(s => ({ ...s, phase: 4 }));
    }, 16000);

    // t=21s: Phase 5 (Fade to White)
    setTimeout(() => {
      setM5State(s => ({ ...s, phase: 5 }));
    }, 21000);
  };

  // Periodic subtle mechanical typing sound on movement down Memory Lane
  useEffect(() => {
    const dx = Math.abs(playerPos[0] - lastPosRef.current[0]);
    const dz = Math.abs(playerPos[2] - lastPosRef.current[1]);
    if ((dx > 0.05 || dz > 0.05) && playerPos[2] < -20 && Math.random() < 0.15 && m5State.phase === 0) {
      audioManager.playSubtleTyping();
    }
    lastPosRef.current = [playerPos[0], playerPos[2], 0];
  }, [playerPos, m5State.phase]);

  // 4-Stage Natural Color & Lighting Progression based on Player Z
  const z = playerPos[2];
  let ambientIntensity = 0.4;
  let directionalIntensity = 1.5;
  let fogColor = '#05050A';
  let pointLightColor = '#EC4899';

  if (z > -28) {
    // Stage 1: Dark Space Base
    ambientIntensity = 0.4;
    directionalIntensity = 1.5;
    fogColor = '#05050A';
    pointLightColor = '#EC4899';
  } else if (z <= -28 && z > -40) {
    // Stage 2: Deep Violet Purple Transition
    const t = (-z - 28) / 12;
    ambientIntensity = THREE.MathUtils.lerp(0.4, 0.65, t);
    directionalIntensity = THREE.MathUtils.lerp(1.5, 1.9, t);
    fogColor = '#130924';
    pointLightColor = '#A855F7';
  } else if (z <= -40 && z > -52) {
    // Stage 3: Brighter Magenta Pulse
    const t = (-z - 40) / 12;
    ambientIntensity = THREE.MathUtils.lerp(0.65, 0.95, t);
    directionalIntensity = THREE.MathUtils.lerp(1.9, 2.3, t);
    fogColor = '#220D42';
    pointLightColor = '#C084FC';
  } else {
    // Stage 4: Hopeful Warm Atmosphere approaching End Gate
    const t = Math.min((-z - 52) / 24, 1.0);
    ambientIntensity = THREE.MathUtils.lerp(0.95, 1.35, t);
    directionalIntensity = THREE.MathUtils.lerp(2.3, 3.0, t);
    fogColor = '#361163';
    pointLightColor = '#F43F5E';
  }

  // Override lighting during cinematic sequence Phase 3+
  if (m5State.phase >= 3) {
    ambientIntensity = 2.0;
    directionalIntensity = 4.0;
    pointLightColor = '#FFFFFF';
  }

  let zoneLabel = 'Neon Gateway';
  if (z < -20) {
    zoneLabel = 'Memory Lane';
  }

  const handleFirstMove = () => {
    if (!hasMoved && m5State.phase === 0) {
      setHasMoved(true);
      audioManager.playZoneChime();
    }
  };

  const handleStoneActivate = (id: string, text: string) => {
    if (m5State.phase === 0) {
      setActiveStoneText(text);
      audioManager.playExaChime();
    }
  };

  const handleStoneDeactivate = () => {
    setActiveStoneText(null);
  };

  const handleMobileJumpPress = () => {
    if (m5State.phase === 0) {
      setIsMobileJumpPressed(true);
      setTimeout(() => setIsMobileJumpPressed(false), 200);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05050A] select-none font-sans">
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 6.5, 10.5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* Milestone 5 Camera Takeover */}
        <Milestone5Camera isActive={m5State.phase >= 4} />

        {/* 4-Stage Fog & Lighting Atmosphere */}
        <fog attach="fog" args={[fogColor, 15, 75]} />
        <ambientLight intensity={ambientIntensity} color="#1E1B4B" />
        <directionalLight position={[15, 35, 20]} intensity={directionalIntensity} color="#A855F7" />
        <pointLight position={[-15, 20, -15]} intensity={1.5} color={pointLightColor} />

        {/* Floating Holographic Title Logo */}
        <HolographicWorldLogo />

        {/* Circular Neon Gateway Spawn Platform */}
        <NeonGatewayPlatform hasMoved={hasMoved} />

        {/* Floating Memory Lane Bridge with Echoes & Props */}
        <MemoryLaneBridge
          playerPos={playerPos}
          onStoneActivate={handleStoneActivate}
          onStoneDeactivate={handleStoneDeactivate}
          isM5Triggered={m5State.phase >= 2}
          isM5Awakened={m5State.phase >= 3}
          isM5Opened={m5State.phase >= 4}
        />

        {/* Playable Player Avatar */}
        <PlayablePlayer
          onPositionUpdate={setPlayerPos}
          onFirstMove={handleFirstMove}
          joystickInput={joystickInput}
          isMobileJumpPressed={isMobileJumpPressed}
          isLocked={m5State.isLocked}
        />

        {/* Floating EXA Companion */}
        <ExaPlayableCompanion playerPos={playerPos} />

        {/* Postprocessing Bloom & Chromatic Aberration */}
        <EffectComposer>
          <Bloom intensity={m5State.phase >= 4 ? 3.0 : 1.6} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0012, 0.0012)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>

      {/* Fade To White Ending Overlay */}
      {m5State.phase >= 5 && (
        <div className="absolute inset-0 z-50 bg-white animate-fadeIn" style={{ animationDuration: '3s' }} />
      )}

      {/* Tutorial HUD Overlay (Hides on movement) */}
      <TutorialOverlay hasMoved={hasMoved} />

      {/* EXA Memory Stone Proximity Narration Callout OR Cinematic Dialogue */}
      {(activeStoneText || m5State.exaDialog) && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none font-sans animate-fadeIn">
          <div className="glass-panel px-6 py-3 rounded-2xl border border-purple-500/50 shadow-cyber-purple flex items-center space-x-3 bg-purple-950/85 backdrop-blur-md">
            <div className="w-8 h-8 rounded-xl bg-purple-900 border border-purple-400 flex items-center justify-center shrink-0 shadow-cyber-purple">
              <Bot className="w-5 h-5 text-purple-300 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> EXA MEMORY RECOVERY
              </div>
              <div className="text-xs font-extrabold text-white text-glow-purple tracking-wide">
                "{m5State.exaDialog || activeStoneText}"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Glassmorphic HUD Overlay (hide during cinematic) */}
      {!m5State.isLocked && (
        <HUDOverlay
          currentZone={zoneLabel}
          playerPos={playerPos}
          proximityProjectId={null}
          onOpenExaChat={() => {}}
          onOpenProjectModal={() => {}}
          onOpenContactModal={() => {}}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(audioManager.toggleMute())}
        />
      )}

      {/* Touch Screen Controls for Mobile */}
      {!m5State.isLocked && (
        <MobileControls
          onJoystickMove={setJoystickInput}
          onJumpPress={handleMobileJumpPress}
          onInteractPress={() => {}}
        />
      )}
    </div>
  );
};
