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
        // Backgrounds — deep purple gradient tones
        navy: {
          950: '#0E0A1A',
          900: '#120E22',
          850: '#16112B',
          800: '#1C1533',
          700: '#251E40',
        },
        // Accent — Soft Lavender / Purple
        jade: {
          DEFAULT: '#B794F4',
          light: '#D6BCFA',
          dark: '#9F7AEA',
          glow: 'rgba(183, 148, 244, 0.15)',
        },
        // Accent — Warm Mauve / Rose
        gold: {
          DEFAULT: '#D4A0C0',
          light: '#E8BCD8',
          muted: 'rgba(212, 160, 192, 0.7)',
        },
        // Accent — Cyan
        cyan: {
          DEFAULT: '#A78BFA',
          muted: 'rgba(167, 139, 250, 0.6)',
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
