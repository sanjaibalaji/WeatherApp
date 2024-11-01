module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: theme => ({
        'weather': "url('../src/assets/background-image.png')",
      }),
    },
  },
    variants: {
    extend: {},
  },
  plugins: [],
}
