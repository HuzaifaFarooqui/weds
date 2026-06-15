/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          red: '#7B1113',
          dark: '#4A0404',
          black: '#1A0000',
        },
        luxury: {
          gold: '#D4AF37',
          goldLight: '#F7E7A9',
          goldDark: '#AA7C11',
          ivory: '#FFFDF6',
          ivoryDark: '#E6DEC9',
        }
      },
      fontFamily: {
        cursive: ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        display: ['"Cinzel"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
