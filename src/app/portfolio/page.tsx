'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Download, QrCode, Sparkles, CheckCircle2, Bot } from 'lucide-react';
import { PROJECTS_DATA } from '@/data/projectsData';
import { audioManager } from '@/lib/audioManager';

export default function Portfolio2DPage() {
  return (
    <div className="min-h-screen bg-[#05050A] text-white p-6 md:p-12 font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-purple-500/30">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>2D ACCESSIBLE PORTFOLIO MODE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white text-glow-purple">
            Project Showcase & Highlights
          </h1>
          <p className="text-sm text-purple-300/80 mt-1">
            Direct access to live applications, mobile APKs, GitHub codebases, and tech specs.
          </p>
        </div>

        <Link
          href="/"
          onClick={() => audioManager.playClick()}
          className="glass-panel px-5 py-3 rounded-2xl border-purple-500/40 text-purple-300 hover:text-white flex items-center space-x-2 w-fit transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider">Back to Landing Screen</span>
        </Link>
      </div>

      {/* Featured Projects Grid */}
      <div className="max-w-6xl mx-auto my-10 space-y-8">
        <h2 className="text-xl font-extrabold text-cyan-300 text-glow-cyan flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" /> Current Completed Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS_DATA.filter((p) => !p.isFuture).map((project) => (
            <div
              key={project.id}
              className="glass-panel p-6 md:p-8 rounded-3xl border-2 border-purple-500/30 hover:border-purple-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    {project.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                    {project.zone.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white text-glow-purple mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-purple-300/80 mb-4">{project.subtitle}</p>

                <p className="text-xs text-gray-200 bg-purple-950/40 p-3.5 rounded-2xl border border-purple-500/20 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-1.5 mb-5">
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-purple-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-xl bg-purple-900/50 border border-purple-400/40 text-cyan-300 text-[11px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-purple-500/30">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-cyber-cyan transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl glass-panel text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all"
                  >
                    <Github className="w-3.5 h-3.5 text-purple-400" />
                    <span>GitHub</span>
                  </a>
                )}
                {project.apkDownloadUrl && (
                  <a
                    href={project.apkDownloadUrl}
                    download
                    className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-cyber-purple transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download APK</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Future R&D Initiatives */}
        <h2 className="text-xl font-extrabold text-purple-400 text-glow-purple pt-8 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" /> Future Gateway (R&D Projects)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS_DATA.filter((p) => p.isFuture).map((project) => (
            <div
              key={project.id}
              className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-400 text-pink-300 font-bold uppercase tracking-widest">
                  FUTURE R&D
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-1">{project.title}</h3>
                <p className="text-xs text-purple-300/80 mb-3">{project.subtitle}</p>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-cyan-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
