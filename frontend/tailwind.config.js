/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lagna-gold": "#d4af37",
        "lagna-blue": "#1e3a8a",
      },
    },
  },
  plugins: [],
};
