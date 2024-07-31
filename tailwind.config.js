/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  presets: [require("./tailwind/presets")], // theme presets
  theme: {
    extend: {
      colors: {
        primary: "rgb(19, 0, 90)",
        secondary: "rgb(3, 201, 136)",
        accent: "rgb(28, 130, 173)",
      },
    },
  },
  plugins: [],
};
