/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000',
          elev: '#0a0a0c',
          card: 'rgba(255, 255, 255, 0.04)',
          'card-hover': 'rgba(255, 255, 255, 0.07)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
        },
        fg: {
          DEFAULT: '#ffffff',
          muted: '#d4d4d8',
          quiet: '#a1a1aa',
          dim: '#71717a',
        },
        accent: {
          DEFAULT: '#2563eb',
          hot: '#3b82f6',
          glow: 'rgba(37, 99, 235, 0.4)',
        },
      },
      fontFamily: {
        display: ['var(--font-saira)', '"Inter Tight"', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      lineHeight: {
        display: '0.86',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
