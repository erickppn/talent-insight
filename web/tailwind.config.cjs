/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        strongPulse: {
          '0%, 100%': { opactity: 1 },
          '50%': { opacity: 0.4 }
        },
        xBounce: {
          '0%, 100%': { transform: 'none' },
          '50%': { transform: 'translateX(15%)' }
        }
      },
      animation: {
        'strong-pulse': 'strongPulse 2s ease-out infinite',
        'x-bounce': 'xBounce .8s ease-in-out infinite'
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
