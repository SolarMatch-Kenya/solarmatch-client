/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006800',
        secondary: '#f79436',
        'tertiary-green': '#133b04',
        'tertiary-yellow': '#fbc71f',
        'tertiary-red': '#ca523b',
        'tertiary-brown': '#ac7c1c',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}