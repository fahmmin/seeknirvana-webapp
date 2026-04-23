/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — deep cosmic dark
        navy: {
          950: '#0A0A0F',
          900: '#0C0C12',
          850: '#101018',
          800: '#14141F',
          700: '#1A1A26',
        },
        // Accent — Nirvana Green (Vitality/Nature)
        jade: {
          DEFAULT: '#00A86B',
          light: '#4dd4a8',
          dark: '#008c59',
          glow: 'rgba(0, 168, 107, 0.15)',
        },
        // Accent — Nirvana Gold (Wisdom/Spiritual)
        gold: {
          DEFAULT: '#C9A227',
          light: '#E8D5A3',
          muted: 'rgba(201, 162, 39, 0.7)',
        },
        // Accent — Nirvana Cyan (Technology/AI - use as hint)
        cyan: {
          DEFAULT: '#00D4FF',
          muted: 'rgba(0, 212, 255, 0.6)',
        },
        // Text hierarchy
        txt: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          muted: 'rgba(255, 255, 255, 0.45)',
          faint: 'rgba(255, 255, 255, 0.25)',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
