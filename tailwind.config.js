module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        benorange: {
          '300': '#ffe9e1',
          '500': '#FF936B',
        },
        benblack: {
          '500': '#333333'
        },
        bengrey: {
          '300': '#9FA9B9',
          '400': '#626363',
          '500': '#e5e5e5'
        }
      },
      fontFamily: {
        'mont' : ['Montserrat'],
      },
      boxShadow: {
        button: '0px 10px 24px rgba(0, 0, 0, 0.08)',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
