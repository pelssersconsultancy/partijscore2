module.exports = {
  purge: ["./src/**/*.svelte"],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      screens: {
        '3xl': '1800px'
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
        '25': 'repeat(25, minmax(0, 1fr))'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
