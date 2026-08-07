'use client';

import React, { useState, useEffect } from 'react';
import { Shield, MessageSquare, FolderKanban, BarChart3, ArrowLeft } from 'lucide-react';
import { fetchContactMessages, ContactMessage } from '@/lib/firebase';
import { PROJECTS_DATA, ProjectItem } from '@/data/projectsData';
import { audioManager } from '@/lib/audioManager';

interface AdminDashboardProps {
  onBackToWorld: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToWorld }) => {
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'analytics'>('messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projectsList] = useState<ProjectItem[]>(PROJECTS_DATA);

  useEffect(() => {
    fetchContactMessages().then(setMessages);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] text-white p-6 md:p-10 font-sans relative overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-500/30">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Shield className="w-4 h-4 text-purple-400" />
            <span>ADMINISTRATOR TERMINAL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white text-glow-purple">
            E'xploreMe Control Dashboard
          </h1>
        </div>

        <button
          onClick={() => {
            audioManager.playClick();
            onBackToWorld();
          }}
          className="glass-panel px-4 py-2.5 rounded-2xl border-purple-500/40 text-purple-300 hover:text-white flex items-center space-x-2 w-fit transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Return to 3D World</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex space-x-3 my-6">
        <button
          onClick={() => {
            audioManager.playClick();
            setActiveTab('messages');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
            activeTab === 'messages'
              ? 'bg-purple-600 text-white shadow-cyber-purple'
              : 'glass-panel text-purple-300 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Messages ({messages.length})</span>
        </button>

        <button
          onClick={() => {
            audioManager.playClick();
            setActiveTab('projects');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
            activeTab === 'projects'
              ? 'bg-purple-600 text-white shadow-cyber-purple'
              : 'glass-panel text-purple-300 hover:text-white'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Projects ({projectsList.length})</span>
        </button>

        <button
          onClick={() => {
            audioManager.playClick();
            setActiveTab('analytics');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
            activeTab === 'analytics'
              ? 'bg-purple-600 text-white shadow-cyber-purple'
              : 'glass-panel text-purple-300 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Content Tab Panels */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-cyan-400">Incoming Contact Transmissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((m) => (
              <div key={m.id} className="glass-panel p-5 rounded-2xl border-purple-500/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-white text-sm">{m.name}</span>
                  <span className="text-[10px] text-cyan-400">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-xs text-purple-300 mb-3">{m.email}</div>
                <p className="text-xs text-gray-200 bg-purple-950/40 p-3 rounded-xl border border-purple-500/20">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-cyan-400">3D World Project Catalog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsList.map((p) => (
              <div key={p.id} className="glass-panel p-5 rounded-2xl border-purple-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white text-sm">{p.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px]">
                    {p.zone}
                  </span>
                </div>
                <p className="text-xs text-purple-200/80 mb-3 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-purple-900/60 text-purple-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl text-center border-purple-500/30">
            <div className="text-3xl font-extrabold text-cyan-400 text-glow-cyan">1,420</div>
            <div className="text-xs text-purple-300 mt-1 uppercase tracking-wider">Total World Visits</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl text-center border-purple-500/30">
            <div className="text-3xl font-extrabold text-purple-400 text-glow-purple">842</div>
            <div className="text-xs text-purple-300 mt-1 uppercase tracking-wider">Project Inspections</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl text-center border-purple-500/30">
            <div className="text-3xl font-extrabold text-pink-400 text-glow-pink">98.4%</div>
            <div className="text-xs text-purple-300 mt-1 uppercase tracking-wider">60 FPS Framerate Target</div>
          </div>
        </div>
      )}
    </div>
  );
};
