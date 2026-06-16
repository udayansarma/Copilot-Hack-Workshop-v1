/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          text: '#e6edf3',
          muted: '#7d8590',
          accent: '#58a6ff',
          green: '#3fb950',
          orange: '#d29922',
          red: '#f85149',
          purple: '#bc8cff',
        },
      },
      fontFamily: {
        mono: ['"Cascadia Code"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
};
