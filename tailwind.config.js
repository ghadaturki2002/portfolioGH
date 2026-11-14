/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // .dark = « nuit d'observatoire » (défaut) ; :root = « calque » (clair)
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        'bg-2': token('bg-2'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        ink: token('ink'),
        'ink-soft': token('ink-soft'),
        'ink-faint': token('ink-faint'),
        hairline: token('hairline'),
        'hairline-strong': token('hairline-strong'),
        accent: token('accent'),
        'accent-fill': token('accent-fill'),
        'accent-ink': token('accent-ink'),
        mech: token('mech'),
        elec: token('elec'),
        soft: token('soft'),
        'mech-chip': token('mech-chip'),
        'elec-chip': token('elec-chip'),
        'soft-chip': token('soft-chip'),
        grid: token('grid'),
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
        prose: '66ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
