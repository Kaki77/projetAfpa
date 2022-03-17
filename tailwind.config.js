module.exports = {
  darkMode: 'class',
  content: [
    "./resources/**/*.blade.php",
    "./resources/js/**/*.js",
  ],
  theme: {
    extend: {
      height:{
        '1/10':'10%'
      },
      gridTemplateRows:{
        '6-maxContent':'repeat(6,max-content)'
      }
    }
  },
  plugins: [],
}
