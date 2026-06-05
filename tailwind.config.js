/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // .dark = Blueprint (cyanotype). :root = Paper (drafting white).
  theme: {
    extend: {
      colors: {
        // Themeable drafting palette — channels set in globals.css per theme.
        paper:      'rgb(var(--paper) / <alpha-value>)',
        'paper-2':  'rgb(var(--paper-2) / <alpha-value>)',
        ink:        'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        hairline:   'rgb(var(--hairline) / <alpha-value>)',
        'hairline-2':'rgb(var(--hairline-2) / <alpha-value>)',
        accent:     'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        sheet: '1180px',
      },
      keyframes: {
        'trace-flow': {
          to: { strokeDashoffset: '-1000' },
        },
        'gear-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'trace-flow': 'trace-flow 6s linear infinite',
        'gear-spin': 'gear-spin 24s linear infinite',
      },
    },
  },
  plugins: [],
}
