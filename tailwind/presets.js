module.exports = {
  darkMode: ["selector", "[data-theme='dark']"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "3rem",
        md: "4rem",
        lg: "5rem",
      },
    },
    extend: {
      colors: {
        ...["primary", "secondary", "success", "warning", "danger", "info"].reduce((acc, color) => {
          acc[`bs-${color}`] = `rgb(var(--bs-${color}) / <alpha-value>)`;
          return acc;
        }, {}),
        ...["track", "thumb", "thumb-h"].reduce((acc, part) => {
          acc[`scroll-${part}`] = `rgb(var(--scroll-${part}) / <alpha-value>)`;
          return acc;
        }, {}),
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "color-text": "rgb(var(--color-text) / <alpha-value>)",
        "color-text-reverse": "rgb(var(--color-reverse) / <alpha-value>)",
        "color-heading": "rgb(var(--color-heading) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        "background-accent": "rgb(var(--color-background-accent) / <alpha-value>)",
        "color-border": "rgb(var(--color-border) / <alpha-value>)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
      },
      keyframes: {
        shrink: {
          "0%": { width: "100%" },
          "100%": { width: "0" },
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
};
