module.exports = {
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "rgb(19, 0, 90)",
        secondary: "rgb(3, 201, 136)",
        accent: "rgb(28, 130, 173)",
      },
      keyframes: {
        "slide-left": {
          "100%": { transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-150%)" },
        },
        shrink: {
          "0%": { width: "100%" },
          "100%": { width: "0" },
        },
      },
      animation: {
        "slide-left": "slide-left 0.5s forwards",
        "slide-up": "slide-up 0.5s forwards",
        shrink: "shrink 0.5s ease-out",
      },
    },
  },
};
