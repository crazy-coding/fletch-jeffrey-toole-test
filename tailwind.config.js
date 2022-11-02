/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DCED71",
        secondary: "#1E1F24",
        tertiary: "#34414B",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
