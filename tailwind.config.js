module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    // colors:{
    //   'blueish':'#243F7C',
    // },
  },
  variants: {
    extend: {},
  },
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [require('./node_modules/tw-elements/dist/plugin')
],
}
