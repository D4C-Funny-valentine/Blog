/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c62641",
        secondary: "#b2223a",
        dusty: "#f8f8f8",
      },
      fontFamily: {
        domine: "Domine",
        josefin: "Josefin Sans",
      },
    },
  },
  plugins: [],
};
