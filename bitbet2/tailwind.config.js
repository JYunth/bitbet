/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        snow: "#fff7f7",
        gainsboro: {
          "100": "#d9d9d9",
          "200": "rgba(217, 217, 217, 0.12)",
          "300": "rgba(217, 217, 217, 0.1)",
        },
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
      },
      borderRadius: {
        "26xl": "45px",
        sm: "14px",
      },
    },
    fontSize: {
      "5xl": "24px",
      mini: "15px",
      "109xl": "128px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
