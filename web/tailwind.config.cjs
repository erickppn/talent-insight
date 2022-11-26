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
        },
        test: {
          '0%': { opacity: "0%", transform: 'translateY(5%)'},
          '100%': { opacity: "100%", transform: 'translateY(0%)'},
        }
      },
      animation: {
        'strong-pulse': 'strongPulse 2s ease-out infinite',
        'x-bounce': 'xBounce .8s ease-in-out infinite',
        'f-bounce': 'test .8s ease',
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
    require('@vidstack/player/tailwind.cjs'),
  ],
}
