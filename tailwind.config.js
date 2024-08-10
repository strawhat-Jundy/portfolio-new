/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  presets: [require("./tailwind/presets")], // theme presets
  plugins: [require("@tailwindcss/container-queries")],
};
