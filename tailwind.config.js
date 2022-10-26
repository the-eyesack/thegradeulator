/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', "./public/index.html"],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', "./public/index.html"],
  theme: {
    extend: {
      colors: {
        main: '#5A4088',
        secondary: '#82754A',
      },
      fontFamily: {
        sans: ['karmina-sans'],
        serif: ['serif'],
      },
      container: {
        center: 'true',
      },
    },
  },
  plugins: [],
}
