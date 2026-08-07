'use client';

import React, { useState } from 'react';
import { X, ExternalLink, Github, Download, QrCode, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '@/data/projectsData';
import { audioManager } from '@/lib/audioManager';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [showQrModal, setShowQrModal] = useState(false);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 md:p-8 border-2 border-purple-500/50 shadow-cyber-purple relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            audioManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel hover:bg-purple-900/60 text-purple-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{project.category.toUpperCase()} PROJECT</span>
            {project.isFuture && (
              <span className="px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-400 text-pink-300 text-[10px]">
                FUTURE R&D
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-glow-purple">
            {project.title}
          </h2>
          <p className="text-sm text-purple-300/80 mt-1">{project.subtitle}</p>
        </div>

        {/* Description */}
        <div className="mb-6 bg-purple-950/30 p-4 rounded-2xl border border-purple-500/20 text-sm text-gray-200 leading-relaxed">
          {project.description}
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
            Key Architecture Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-purple-100 bg-purple-900/20 p-2.5 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-xl bg-purple-900/50 border border-purple-400/40 text-cyan-300 text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons (Live Demo, GitHub, Download APK) */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-purple-500/30">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => audioManager.playClick()}
              className="flex-1 min-w-[140px] px-4 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-cyber-cyan transition-all"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => audioManager.playClick()}
              className="px-4 py-3 rounded-2xl glass-panel hover:bg-purple-900/60 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all"
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
            </a>
          )}

          {project.apkDownloadUrl && (
            <>
              <a
                href={project.apkDownloadUrl}
                download
                onClick={() => audioManager.playClick()}
                className="flex-1 min-w-[140px] px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-cyber-purple transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download APK</span>
              </a>

              <button
                onClick={() => {
                  audioManager.playClick();
                  setShowQrModal(!showQrModal);
                }}
                className="p-3 rounded-2xl glass-panel hover:bg-purple-900/60 text-purple-300 hover:text-white transition-all"
                title="Show Mobile Download QR Code"
              >
                <QrCode className="w-5 h-5 text-cyan-400" />
              </button>
            </>
          )}
        </div>

        {/* QR Code Popup */}
        {showQrModal && (
          <div className="mt-4 p-4 rounded-2xl bg-purple-950/90 border border-cyan-400 flex flex-col items-center animate-fadeIn">
            <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center">
              {/* QR Mock graphic */}
              <div className="w-full h-full border-4 border-black grid grid-cols-4 gap-1 p-1">
                <div className="bg-black" />
                <div className="bg-black" />
                <div className="bg-white" />
                <div className="bg-black" />
                <div className="bg-black" />
                <div className="bg-white" />
                <div className="bg-black" />
                <div className="bg-black" />
              </div>
            </div>
            <p className="text-xs text-cyan-300 mt-2 font-medium">Scan to Download on Mobile Device</p>
          </div>
        )}
      </div>
    </div>
  );
};
