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
        '5-maxContent':'repeat(5,max-content)'
      }
    }
  },
  plugins: [],
}
