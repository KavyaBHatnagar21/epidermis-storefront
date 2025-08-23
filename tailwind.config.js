/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // enables 'dark:' variant via a class
  theme: {
    extend: {
      colors: {
        primary: "#3D3737",
        secondary: "#5A5A5A",
      },
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Didot", "Times New Roman", "serif"],
        cursive: ["Ephesis", "Brush Script MT", "cursive"]
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
