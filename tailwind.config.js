module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.05)",
        glassBorder: "rgba(255, 255, 255, 0.12)",
        appleBlue: "#0071e3",
        appleGlow: "rgba(0, 113, 227, 0.4)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
}
