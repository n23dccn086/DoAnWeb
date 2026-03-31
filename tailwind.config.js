/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1E3A8A',
        secondary: '#6366F1',
        accent: '#F97316',
        success: '#10B981',
      }
    },
  },
  plugins: [],
}