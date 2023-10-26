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
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        modalShow: {
          '0%': {
            opacity: 0, 
            transform: 'translateY(1.5rem)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        test: {
          '0%': { opacity: "0%", transform: 'translateY(5%)'},
          '100%': { opacity: "100%", transform: 'translateY(0%)'},
        }
      },
      animation: {
        'strong-pulse': 'strongPulse 2s ease-out infinite',
        'x-bounce': 'xBounce .8s ease-in-out infinite',
        'overlayShow': 'overlayShow .2s',
        'modal-show': 'modalShow ease-out .3s',
        'f-bounce': 'test .8s ease',
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
    require('vidstack/tailwind.cjs'),
  ],
}
