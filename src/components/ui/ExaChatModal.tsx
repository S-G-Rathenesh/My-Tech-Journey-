'use client';

import React, { useState } from 'react';
import { X, Bot, Send, Volume2, Sparkles, User, HelpCircle } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';

interface ExaChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'exa' | 'user';
  text: string;
}

const KNOWLEDGE_BASE: { [key: string]: string } = {
  projects: "The developer has built high-impact projects including AI Resume Builder (FastAPI + Gemini), Wake-up Darling (Motivational Alarm), Paalkaran (Dairy Logistics), VibeSync (Audio Sync), and SpendGuard (Finance Vault).",
  skills: "Core expertise includes Next.js 15, TypeScript, React Three Fiber, Flutter, Python FastAPI, Firebase Firestore, and AI API integrations.",
  contact: "You can reach out directly by walking south to the Communication Nexus or typing your message here to transmit to the developer!",
  resume: "The developer's AI Resume Builder is live in the AI Research Lab (North Zone).",
  default: "I am EXA, your cyber guide in E'xploreMe! I can tell you about projects, technical skills, background, or navigate you around the 3D world. What would you like to explore?"
};

export const ExaChatModal: React.FC<ExaChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'exa', text: "Greetings visitor! I am EXA, your AI companion. Ask me anything about the developer's projects, tech stack, or career journey." }
  ]);
  const [input, setInput] = useState('');
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);

  if (!isOpen) return null;

  const speakText = (text: string) => {
    if (isTtsEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (query?: string) => {
    const textToSend = query || input;
    if (!textToSend.trim()) return;

    audioManager.playClick();
    const newMessages: Message[] = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');

    // Process Response
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let reply = KNOWLEDGE_BASE.default;

      if (lower.includes('project') || lower.includes('work') || lower.includes('app')) {
        reply = KNOWLEDGE_BASE.projects;
      } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
        reply = KNOWLEDGE_BASE.skills;
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
        reply = KNOWLEDGE_BASE.contact;
      } else if (lower.includes('resume') || lower.includes('cv')) {
        reply = KNOWLEDGE_BASE.resume;
      }

      setMessages((prev) => [...prev, { sender: 'exa', text: reply }]);
      speakText(reply);
      audioManager.playExaChime();
    }, 400);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0D0A1A]/95 border-l-2 border-cyan-500/40 backdrop-blur-xl shadow-cyber-cyan p-6 flex flex-col justify-between animate-slideLeft font-sans">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center shadow-cyber-cyan">
              <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white text-glow-cyan flex items-center gap-1.5">
                EXA AI GUIDE <Sparkles className="w-4 h-4 text-purple-400" />
              </h3>
              <p className="text-[11px] text-cyan-300/80">Cyber AI Companion System</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTtsEnabled(!isTtsEnabled)}
              className={`p-2 rounded-xl border transition-all ${
                isTtsEnabled ? 'bg-cyan-900/60 border-cyan-400 text-cyan-300' : 'bg-purple-950/40 border-purple-500/20 text-purple-400'
              }`}
              title="Toggle Voice Synthesizer (Text-to-Speech)"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                audioManager.playClick();
                onClose();
              }}
              className="p-2 rounded-xl glass-panel text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="flex items-center space-x-2 my-3 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => handleSend('Tell me about current projects')}
            className="px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-purple-200 shrink-0 flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Projects
          </button>
          <button
            onClick={() => handleSend('What is the developer tech stack?')}
            className="px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-purple-200 shrink-0"
          >
            Tech Stack
          </button>
          <button
            onClick={() => handleSend('How can I contact the developer?')}
            className="px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-purple-200 shrink-0"
          >
            Contact Info
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 my-4 overflow-y-auto space-y-3.5 pr-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'exa' && (
              <div className="w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            )}

            <div
              className={`p-3.5 rounded-2xl text-xs max-w-[82%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-tr-none shadow-cyber-purple'
                  : 'glass-panel text-gray-200 rounded-tl-none border-cyan-500/30'
              }`}
            >
              {m.text}
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-purple-900 border border-purple-400 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-purple-200" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center space-x-2 pt-3 border-t border-cyan-500/30"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask EXA about projects, skills..."
          className="flex-1 px-4 py-3 rounded-2xl bg-purple-950/60 border border-cyan-500/30 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          className="p-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyber-cyan transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
