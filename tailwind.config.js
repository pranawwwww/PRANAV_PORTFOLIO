/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        // Dark Mode (Charcoal)
        'bg': 'rgb(var(--color-bg) / <alpha-value>)',
        'surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
        'text': 'rgb(var(--color-text) / <alpha-value>)',
        'muted': 'rgb(var(--color-muted) / <alpha-value>)',
        'border': 'rgb(var(--color-border) / <alpha-value>)',
        'accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        'accent-focus': 'rgb(var(--color-accent-focus) / <alpha-value>)',
      },
      lineHeight: {
        'relaxed': '1.6',
      },
      maxWidth: {
        'reading': '65ch',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}
