/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF4FF',
          500: '#1E66F5',
          600: '#1557d6',
        },
        navy: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          900: '#0F172A',
          950: '#020617',
        },
        teal: {
          400: '#2DD4BF',
          500: '#0EA5A4',
          600: '#0d9393',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(14,165,164,0.15)',
        'glow-lg': '0 0 60px rgba(14,165,164,0.2)',
      },
    },
  },
  plugins: [require('daisyui')],
};