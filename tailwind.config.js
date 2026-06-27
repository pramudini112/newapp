/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  'hsl(252, 100%, 97%)',
          100: 'hsl(252, 94%, 92%)',
          200: 'hsl(252, 90%, 84%)',
          300: 'hsl(252, 86%, 74%)',
          400: 'hsl(252, 82%, 64%)',
          500: 'hsl(252, 78%, 55%)',
          600: 'hsl(252, 74%, 47%)',
          700: 'hsl(252, 70%, 40%)',
          800: 'hsl(252, 66%, 32%)',
          900: 'hsl(252, 62%, 24%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px 0 rgba(108,72,234,0.10)',
        'input': '0 2px 8px 0 rgba(108,72,234,0.07)',
        'btn':   '0 4px 20px 0 rgba(108,72,234,0.40)',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease both',
      },
    },
  },
  plugins: [],
}
