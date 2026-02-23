import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0F',
          900: '#0A0A0F',
          800: '#111118',
          700: '#1A1A24',
          600: '#242430',
        },
        'dark-card': '#12121A',
        'dark-section': '#0E0E16',
        gold: {
          DEFAULT: '#C9A962',
          light: '#D4BC7C',
          dark: '#A68B4B',
        },
        'gold-light': '#D4BC7C',
        'light-bg': '#F8F7F5',
        'light-text': '#1A1A1A',
        'light-text-secondary': '#4A4A4A',
        'light-border': '#E5E5E5',
        cream: '#F5F0E8',
        slate: '#8E8E9A',
        muted: '#8A8A9A',
        light: '#E8E8EC',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Aptos', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
