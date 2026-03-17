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
        // ── Brand Primary ──────────────────────────────────
        'brand-black': '#000000',
        'brand-peach': '#F1BF81',     // Light warm gold — taglines, highlights
        'brand-gold': '#BF9000',      // Primary gold — buttons, accents
        'brand-bronze': '#B5781D',    // Dark gold — hover states

        // ── Brand Neutrals ─────────────────────────────────
        'brand-silver': '#D9DADC',    // Light grey — borders
        'brand-slate': '#556689',     // Slate blue — secondary text
        'brand-grey': '#8A9096',      // Mid grey — secondary text
        'brand-taupe': '#8A7660',     // Warm brown — earthy accent

        // ── Brand Backgrounds ──────────────────────────────
        'brand-white': '#FFFFFF',
        'brand-offwhite': '#F8F7F5',  // Warm off-white for alternating sections
        'brand-dark': '#0A0A0A',      // Dark sections, navbar, footer, heroes

        // ── Legacy aliases (mapped to new brand palette) ───
        dark: {
          DEFAULT: '#0A0A0A',
          900: '#0A0A0A',
          800: '#111111',
          700: '#1A1A1A',
          600: '#242424',
        },
        'dark-card': '#121212',
        'dark-section': '#0E0E0E',
        gold: {
          DEFAULT: '#BF9000',
          light: '#F1BF81',
          dark: '#B5781D',
        },
        'gold-light': '#F1BF81',
        'light-bg': '#F8F7F5',
        'light-text': '#1A1A1A',
        'light-text-secondary': '#4A4A4A',
        'light-border': '#E5E5E5',
        cream: '#F5F0E8',
        slate: '#556689',
        muted: '#8A9096',
        light: '#E8E8EC',
      },
      fontFamily: {
        // Heading: Inter (stand-in for Neue Montreal Bold)
        // Sub-heading: Crimson Pro
        // Body: Inter (stand-in for Neue Montreal Regular)
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Aptos', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
