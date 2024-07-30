/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(19, 0, 90)",
        secondary: "rgb(3, 201, 136)",
        accent: "rgb(28, 130, 173)",
      },
      spacing: {
        1.7: "0.438rem",
        2.7: "0.688rem",
      },
      fontSize: {
        tn: "0.813rem",
      },
    },
  },
  plugins: [],
};
