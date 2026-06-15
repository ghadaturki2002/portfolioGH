/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // .dark = warm workshop at night (default) ; :root = paper lab
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        // TRICHROME channels — text-safe tokens
        mech: 'rgb(var(--mech) / <alpha-value>)',
        elec: 'rgb(var(--elec) / <alpha-value>)',
        soft: 'rgb(var(--soft) / <alpha-value>)',
        // chip/fill-only tokens (never set type in these)
        'mech-chip': 'rgb(var(--mech-chip) / <alpha-value>)',
        'elec-chip': 'rgb(var(--elec-chip) / <alpha-value>)',
        'soft-chip': 'rgb(var(--soft-chip) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1280px',
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
