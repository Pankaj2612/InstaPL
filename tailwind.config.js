/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "public/*/*.jsx"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
