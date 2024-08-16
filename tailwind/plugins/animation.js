const plugin = require("tailwindcss/plugin");

const animationPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      "animate-duration": (value) => ({
        animationDuration: value,
      }),
    },
    { values: theme("transitionDuration") }
  );
});

module.exports = animationPlugin;
