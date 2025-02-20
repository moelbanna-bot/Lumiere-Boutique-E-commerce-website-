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
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#1a365d',
          500: '#152a4a',
          600: '#0f1f38',
          700: '#091526',
          800: '#040b13',
          900: '#000000',
        },
        accent: {
          gold: '#d4af37',
          rose: '#d4a5a5',
          sage: '#9caf88',
        },
        gray: {
          warm: '#a39f9f',
          light: '#f5f5f5',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}