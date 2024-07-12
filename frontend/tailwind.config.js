/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "public/*/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1DB954",
      },
    },
  },
  plugins: [],
};
