module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        benorange: {
          '500': '#FF936B',
        },
        benblack: {
          '500': '#333333'
        },
        bengrey: {
          '400': '#626363',
          '500': '#e5e5e5'
        }
      },
      fontFamily: {
        'mont' : ['Montserrat'],
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
