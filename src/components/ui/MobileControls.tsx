'use client';

import React, { useState, useRef } from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface MobileControlsProps {
  onJoystickMove: (input: { x: number; y: number } | null) => void;
  onJumpPress: () => void;
  onInteractPress: () => void;
  showInteractBtn?: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onJoystickMove,
  onJumpPress,
  onInteractPress,
  showInteractBtn,
}) => {
  const [joystickActive, setJoystickActive] = useState(false);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const maxRadius = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setJoystickActive(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxRadius);

    const knobX = Math.cos(angle) * clampedDist;
    const knobY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: knobX, y: knobY });

    // Normalized input (-1 to 1)
    onJoystickMove({
      x: knobX / maxRadius,
      y: -knobY / maxRadius,
    });
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    setJoystickActive(false);
    setKnobPos({ x: 0, y: 0 });
    onJoystickMove(null);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-20 sm:hidden flex justify-between items-end p-6 select-none">
      {/* Left Virtual Touch Joystick Base */}
      <div
        className="pointer-events-auto relative w-28 h-28 rounded-full bg-purple-950/40 border-2 border-purple-500/50 backdrop-blur-md flex items-center justify-center touch-none shadow-cyber-purple"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Joystick Thumb Knob */}
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 border-2 border-white shadow-cyber-cyan transition-transform ${
            joystickActive ? 'scale-110' : ''
          }`}
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        />
      </div>

      {/* Right Action Buttons */}
      <div className="pointer-events-auto flex flex-col space-y-3 items-end">
        {showInteractBtn && (
          <button
            onTouchStart={() => {
              audioManager.playClick();
              onInteractPress();
            }}
            onClick={onInteractPress}
            className="w-14 h-14 rounded-full bg-pink-600/90 border-2 border-white text-white flex items-center justify-center shadow-cyber-pink active:scale-95 animate-bounce"
          >
            <Terminal className="w-6 h-6" />
          </button>
        )}

        {/* Jump Button */}
        <button
          onTouchStart={() => {
            onJumpPress();
          }}
          onClick={onJumpPress}
          className="w-14 h-14 rounded-full bg-purple-600/90 border-2 border-white text-white flex items-center justify-center shadow-cyber-purple active:scale-95"
        >
          <ArrowUp className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
