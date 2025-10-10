/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'verde-escuro': '#a1a692',
        'cinza-claro': '#d6d9cc',
        'bege-claro': '#f2e0d0',
        'marrom-claro': '#d6b8a5',
        'marrom-avermelhado': '#a35c42',
        'rosa-queimado': '#bf7b6b',
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Caveat", "cursive"],
        mono: ["Roboto Mono", "monospace"],
        playwrite: ["Playwrite AU QLD", "Playwrite HR", "serif"],
      },
    },
  },
  plugins: [],
};