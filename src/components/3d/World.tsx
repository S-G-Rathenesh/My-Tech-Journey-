'use client';

import React from 'react';
import { MainPlaza } from './Zones/MainPlaza';
import { AiResearchLab } from './Zones/AiResearchLab';
import { MobileHub } from './Zones/MobileHub';
import { AchievementHall } from './Zones/AchievementHall';
import { FuturePortal } from './Zones/FuturePortal';
import { CommunicationNexus } from './Zones/CommunicationNexus';
import { CyberParticles } from './Effects/CyberParticles';
import * as THREE from 'three';

interface WorldProps {
  highlightedProjectId?: string | null;
}

export const World: React.FC<WorldProps> = ({ highlightedProjectId }) => {
  return (
    <group>
      {/* Dynamic World Atmosphere Fog */}
      <fog attach="fog" args={['#05050A', 15, 65]} />

      {/* Futuristic Ground Grid Plane */}
      <gridHelper
        args={[140, 70, '#A855F7', '#1A103C']}
        position={[0, -0.01, -10]}
      />

      {/* Deep Ground Dark Surface */}
      <mesh position={[0, -0.1, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial color="#05050A" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Cyber Ambient Floating Dust */}
      <CyberParticles />

      {/* World Zones */}
      <MainPlaza />
      <AiResearchLab isHighlighted={highlightedProjectId === 'ai-resume-builder'} />
      <MobileHub highlightedId={highlightedProjectId} />
      <AchievementHall />
      <FuturePortal highlightedId={highlightedProjectId} />
      <CommunicationNexus isHighlighted={highlightedProjectId === 'contact-nexus'} />
    </group>
  );
};
