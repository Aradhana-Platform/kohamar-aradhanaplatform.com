module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router pages
    "./components/**/*.{js,ts,jsx,tsx}", // Components folder
  ],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/typography")],
};