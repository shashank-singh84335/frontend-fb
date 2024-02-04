/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#465FF1",
        darkprimary:"#26282A"
      },
    },
  },
  plugins: [],
  darkMode: ["class"],
}
