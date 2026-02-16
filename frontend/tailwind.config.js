/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Modern Monochrome + Subtle Accent Design System
        'accent': {
          DEFAULT: '#E8DCC8', // Soft champagne gold
          light: '#F5EFE5',
          dark: '#D4C4A8',
          hover: '#DCC8B0',
          foreground: '#000000',
        },
        'primary': {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
          dark: '#0A0A0A',
          light: '#1A1A1A',
        },
        'secondary': {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
          dark: '#F8F8F8',
          light: '#FAFAFA',
        },
        // LEXA Design System - Dark Luxury (legacy)
        'platinum': {
          DEFAULT: '#E2E8F0',
          light: '#F1F5F9',
          dark: '#94A3B8',
        },
        'charcoal': {
          DEFAULT: '#2A2A2A',
          light: '#404040',
          dark: '#1A1A1A',
        },
        'lexa-black': '#0A0A0A',
        'lexa-surface': '#121212',
        'lexa-surface-highlight': '#1E1E1E',
        'lexa-border': '#27272A',
        'lexa-gray': '#F4F4F5',
        // Curator's Gallery - Light Luxury
        'gallery': {
          base: '#F9F9F7',
          white: '#FFFFFF',
          cream: '#F2F0E9',
          black: '#1A1A1A',
          gray: '#4A4A4A',
          gold: '#9F8B65',
          accent: '#E8DCC8',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'var(--font-dm-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Outfit', 'var(--font-outfit)', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'metallic': 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 25%, #C0C0C0 50%, #E0E0E0 75%, #FFFFFF 100%)',
      },
      boxShadow: {
        // 3D Depth & Neumorphism
        'neu-sm': '2px 2px 4px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.7)',
        'neu': '4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.7)',
        'neu-lg': '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.7)',
        'neu-inset': 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.7)',
        'depth-sm': '0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        'depth': '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
        'depth-lg': '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        'depth-xl': '0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)',
        'float': '0 8px 16px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
        'float-lg': '0 12px 24px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.1)',
        'glow': '0 0 20px rgba(232,220,200,0.4), 0 0 40px rgba(232,220,200,0.2)',
        'glass': '0 8px 32px rgba(0,0,0,0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "lift": "lift 0.3s ease-out",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(232,220,200,0.2), 0 0 10px rgba(232,220,200,0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(232,220,200,0.4), 0 0 40px rgba(232,220,200,0.2)' },
        },
        lift: {
          '0%': { transform: 'translateY(0px)', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' },
          '100%': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}