/** @type {import('tailwindcss').Config} */

const plugin = require('@tailwindcss/typography');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [plugin],
}
