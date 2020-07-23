/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: ['./src/**/*.vue']
  },
  theme: {
    extend: {
      colors: {
        primary: '#004250',
        secondary: '#3094B4'
      },
      container: {
        center: true
      },
      fontFamily: {
        sans: ['TT Norms', 'Inter var', ...defaultTheme.fontFamily.sans]
      },
      screens: {
        xs: '425px'
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '84': '21rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '132': '33rem',
        '136': '34rem',
        '144': '36rem',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')]
}
