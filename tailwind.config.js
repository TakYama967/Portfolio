/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f8fcff',
          100: '#f0f9ff',
          200: '#e0f2fe',
          300: '#bae6fd',
          400: '#7dd3fc',
          500: '#38bdf8',
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#0369a1',
          900: '#075985',
        },
        japanese: {
          red: '#ef4444',
          gold: '#fbbf24',
          indigo: '#6366f1',
          emerald: '#34d399',
        },
        soft: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        surface: {
          900: '#0a0a0f',
          800: '#111827',
          700: '#1a1f2e',
        },
      },
      fontFamily: {
        'japanese': ['Noto Sans JP', 'sans-serif'],
        'sans': ['Poppins', 'Inter', 'sans-serif'],
        'heading': ['Space Grotesk', 'Poppins', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Space Grotesk', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-ocean': '0 0 20px rgba(14, 165, 233, 0.3), 0 0 40px rgba(14, 165, 233, 0.1)',
        'glow-ocean-sm': '0 0 10px rgba(14, 165, 233, 0.2)',
        'glow-purple': '0 0 20px rgba(147, 51, 234, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'ocean-wave': 'oceanWave 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        oceanWave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        gradientShift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' },
        },
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
        'japanese-gradient': 'linear-gradient(135deg, #dc2626 0%, #f59e0b 50%, #10b981 100%)',
        'mesh-dark': 'radial-gradient(at 40% 20%, rgba(14, 165, 233, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(147, 51, 234, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(59, 130, 246, 0.05) 0px, transparent 50%)',
        'radial-ocean': 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
