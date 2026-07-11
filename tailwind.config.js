/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
        opensans: ['Open Sans', 'system-ui', 'sans-serif'],
        merriweather: ['Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        cast: {
          gold: '#C9A84C',
          'gold-light': '#E8C96A',
          'gold-dark': '#A07830',
          dark: '#0A0A0F',
          'dark-2': '#111118',
          'dark-3': '#1A1A28',
          'dark-4': '#22223A',
        },
        bp: {
          navy: '#0D1B2A',
          gold: '#C9A452',
          cream: '#F5F0E8',
          'navy-deep': '#060e17',
        },
        pulso: {
          navy: '#0A1628',
          'navy-light': '#0D2035',
          'navy-deep': '#06101C',
        },
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'wave-drift-r': 'wave-drift-r 14s linear infinite',
        'wave-drift-l': 'wave-drift-l 9s linear infinite',
        'wave-drift-r2': 'wave-drift-r2 20s linear infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'wave-drift-r': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'wave-drift-l': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'wave-drift-r2': {
          '0%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(-70%)' },
        },
      },
    },
  },
  plugins: [],
}
