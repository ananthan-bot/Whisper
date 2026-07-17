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
          50: '#E1F5EE',
          400: '#5DCAA5',
          600: '#1D9E75',
        },
        accent: {
          50: '#EEEDFE',
          600: '#534AB7',
        },
        warning: {
          500: '#F59E0B',
        },
        wordsmith: {
          500: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
}
