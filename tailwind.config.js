/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Baskervville', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        obsidian: '#000000',
        gold: '#d4af37',
        bronze: '#8b7355',
        ivory: '#ffffff',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
      }
    },
  },
  plugins: [],
}
