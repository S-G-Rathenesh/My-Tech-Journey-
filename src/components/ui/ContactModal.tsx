'use client';

import React, { useState } from 'react';
import { X, Send, Terminal, CheckCircle2, Sparkles } from 'lucide-react';
import { sendContactMessage } from '@/lib/firebase';
import { audioManager } from '@/lib/audioManager';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    audioManager.playClick();

    const success = await sendContactMessage(name, email, message);
    setIsSubmitting(false);

    if (success) {
      setIsSent(true);
      audioManager.playZoneChime();
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setIsSent(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 md:p-8 border-2 border-cyan-500/50 shadow-cyber-cyan relative">
        <button
          onClick={() => {
            audioManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel hover:bg-purple-900/60 text-purple-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>COMMUNICATION NEXUS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white text-glow-cyan">
            Transmit Transmission
          </h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Send a direct encrypted message to the developer.
          </p>
        </div>

        {isSent ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-cyan-400 animate-bounce" />
            <h3 className="text-xl font-bold text-white text-glow-cyan">Transmission Dispatched!</h3>
            <p className="text-xs text-purple-300">Your message has been received by the Communication Nexus.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
                Your Name / Organization
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Connor (Tech Recruiter)"
                className="w-full px-4 py-3 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-white placeholder-purple-400/40 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@techfirm.io"
                className="w-full px-4 py-3 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-white placeholder-purple-400/40 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
                Message / Opportunities
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-white placeholder-purple-400/40 text-xs focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-cyber-purple transition-all"
            >
              {isSubmitting ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <span>Dispatch Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
