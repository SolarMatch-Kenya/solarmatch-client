/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'tertiary-green': 'var(--color-tertiary-green)',
        'tertiary-yellow': 'var(--color-tertiary-yellow)',
        'tertiary-red': 'var(--color-tertiary-red)',
        'tertiary-brown': 'var(--color-tertiary-brown)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
