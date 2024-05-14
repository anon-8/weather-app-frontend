/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      screens: {

        'sd': '660px',

        'md': '960px',

        'hd': '1400px',

        'fhd': '1800px',

        'wqhd': '2200px',

      },

    },
  },
  plugins: [],
}

