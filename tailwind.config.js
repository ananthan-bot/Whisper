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
          50:  '#E1F5EE',
          100: '#C3EBD9',
          200: '#9DDCC3',
          300: '#76CCAC',
          400: '#5DCAA5',
          500: '#2EB88A',
          600: '#1D9E75',
          700: '#157A5A',
          800: '#0D5740',
          900: '#063326',
        },
        accent: {
          50:  '#EEEDFE',
          100: '#D8D5FD',
          200: '#B7B1FB',
          300: '#9690F8',
          400: '#7A72F5',
          500: '#6259E0',
          600: '#534AB7',
          700: '#3F388E',
          800: '#2B2665',
          900: '#17143C',
        },
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        pink: {
          50:  '#FDF2F8',
          100: '#FCE7F3',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px 0 rgba(0,0,0,0.06)',
        card: '0 4px 24px 0 rgba(0,0,0,0.08)',
        glow: '0 0 20px 0 rgba(29,158,117,0.25)',
      },
      animation: {
        'pulse-slow':  'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':       'float 4s ease-in-out infinite',
        'fade-in-up':  'fadeInUp 0.5s ease forwards',
        'breath':      'breath 4s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        breath: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}

