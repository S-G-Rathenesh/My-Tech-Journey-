import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05050A',
          card: 'rgba(15, 12, 30, 0.75)',
          purple: '#A855F7',
          'purple-glow': '#8B5CF6',
          cyan: '#06B6D4',
          'cyan-glow': '#22D3EE',
          pink: '#EC4899',
          border: 'rgba(168, 85, 247, 0.4)',
        },
      },
      boxShadow: {
        'cyber-purple': '0 0 25px rgba(168, 85, 247, 0.5), inset 0 0 15px rgba(168, 85, 247, 0.2)',
        'cyber-cyan': '0 0 25px rgba(6, 182, 212, 0.5), inset 0 0 15px rgba(6, 182, 212, 0.2)',
        'cyber-pink': '0 0 25px rgba(236, 72, 153, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-spin': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
