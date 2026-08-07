'use client';

import React, { useEffect, useRef } from 'react';

interface CinematicBackgroundProps {
  reducedMotion?: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize Stars
    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Initialize Floating Cyber Particles
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    // Subtle Purple Lightning Arc Generator State
    let lightningActive = false;
    let lightningTimer = 0;
    let lightningSegments: { x: number; y: number }[] = [];

    const triggerLightning = () => {
      lightningActive = true;
      lightningSegments = [];
      let startX = Math.random() * width;
      let startY = 0;
      lightningSegments.push({ x: startX, y: startY });

      let currentX = startX;
      let currentY = startY;

      while (currentY < height * 0.6) {
        currentX += (Math.random() - 0.5) * 60;
        currentY += Math.random() * 40 + 20;
        lightningSegments.push({ x: currentX, y: currentY });
      }

      setTimeout(() => {
        lightningActive = false;
      }, 150);
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Space Black Base
      const spaceGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      spaceGrad.addColorStop(0, '#0B0A1C');
      spaceGrad.addColorStop(0.6, '#05050A');
      spaceGrad.addColorStop(1, '#020205');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Purple Nebula Atmosphere Pulse
      if (!reducedMotion) {
        const nebulaX = width * 0.5 + Math.sin(time * 0.5) * 80;
        const nebulaY = height * 0.4 + Math.cos(time * 0.4) * 50;
        const nebulaGrad = ctx.createRadialGradient(
          nebulaX,
          nebulaY,
          20,
          nebulaX,
          nebulaY,
          width * 0.45
        );
        nebulaGrad.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
        nebulaGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
        nebulaGrad.addColorStop(1, 'rgba(5, 5, 10, 0)');

        ctx.fillStyle = nebulaGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Twinkling Starfield
      stars.forEach((star) => {
        if (!reducedMotion) {
          star.alpha += star.speed;
          if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Floating Cyber Particles
      particles.forEach((p) => {
        if (!reducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        }

        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Periodic Subtle Purple Lightning Arcs
      if (!reducedMotion) {
        lightningTimer += 1;
        if (lightningTimer > 350 && Math.random() < 0.03) {
          lightningTimer = 0;
          triggerLightning();
        }

        if (lightningActive && lightningSegments.length > 1) {
          ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#A855F7';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.moveTo(lightningSegments[0].x, lightningSegments[0].y);
          for (let i = 1; i < lightningSegments.length; i++) {
            ctx.lineTo(lightningSegments[i].x, lightningSegments[i].y);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
