/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: [],
  theme: {
    colors: {
      main: '#5A4088',
      secondary: '#82754A',
      white: '#FFFFFF'
    },
    fontFamily: {
      sans: ['karmina-sans'],
      serif: ['serif'],
    },
    container: {
      center: 'true',
    },
    extend: {},
  },
  plugins: [],
}
