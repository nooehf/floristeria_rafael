/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a4d2e', // Dark Green
          light: '#e8f5e9',   // Pastel Green
        },
        secondary: '#18181b', // Zinc 900 (Almost Black)
        pastel: '#f0fdf4',    // Very light green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
