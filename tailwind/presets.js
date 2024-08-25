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
        "bs-primary": "rgb(var(--bs-primary) / <alpha-value>)",
        "bs-secondary": "rgb(var(--bs-secondary) / <alpha-value>)",
        "bs-success": "rgb(var(--bs-success) / <alpha-value>)",
        "bs-warning": "rgb(var(--bs-warning) / <alpha-value>)",
        "bs-danger": "rgb(var(--bs-danger) / <alpha-value>)",
        "bs-info": "rgb(var(--bs-info) / <alpha-value>)",
        "scroll-track": "rgb(var(--scroll-track) / <alpha-value>)",
        "scroll-thumb": "rgb(var(--scroll-thumb) / <alpha-value>)",
        "scroll-thumb-h": "rgb(var(--scroll-thumb-hover) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "color-text": "rgb(var(--color-text) / <alpha-value>)",
        "color-text-reverse": "rgb(var(--color-reverse) / <alpha-value>)",
        "color-heading": "rgb(var(--color-heading) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        "background-accent":
          "rgb(var(--color-background-accent) / <alpha-value>)",
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
