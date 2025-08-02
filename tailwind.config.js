module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        benorange: {
          300: "#FFF3EC",
          500: "#FF872A",
        },
        benblack: {
          500: "#202127",
        },
        bengrey: {
          100: "#E1E1E1",
          200: "#e5e5e5",
          300: "#9FA9B9",
          400: "#626363",
          500: "#5C606B",
        },
        bencustomgrey: {
          500: "#737373",
        },
      },
      fontSize: {
        "5xl": "2.7rem",
        "6xl": "3.3rem",
      },
      fontFamily: {
        mont: ["Montserrat"],
        inter: ["Inter"],
        average: ["Average"],
      },
      boxShadow: {
        button: "0px 10px 24px rgba(0, 0, 0, 0.08)",
        "3xl": "0px 10px 18px rgba(0, 0, 0, 0.08)",
      },
      zIndex: {
        "-1": "-1",
        "-2": "-2",
        "-3": "-3",
        "-4": "-4",
        "-5": "-5",
        "-6": "-6",
        "-7": "-7",
        "-8": "-8",
      },
      scrollBehavior: ["responsive"],
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
