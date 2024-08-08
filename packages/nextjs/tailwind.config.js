/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FF5722", // Orange-red primary color
          "primary-content": "#FFFFFF", // White text on primary
          secondary: "#FFC107", // Yellow secondary color
          "secondary-content": "#212121", // Dark gray text on secondary
          accent: "#4CAF50", // Green accent color
          "accent-content": "#FFFFFF", // White text on accent
          neutral: "#212121", // Dark gray neutral
          "neutral-content": "#FFFFFF", // White text on neutral
          "base-100": "#FAFAFA", // Light gray base color
          "base-200": "#F5F5F5", // Slightly darker base color
          "base-300": "#EEEEEE", // Even darker base color
          "base-content": "#212121", // Dark gray base content
          info: "#2196F3", // Blue info color
          success: "#4CAF50", // Green success color
          warning: "#FFC107", // Yellow warning color
          error: "#F44336", // Red error color
        },
      },
      {
        dark: {
          primary: "#FF5722",
          "primary-content": "#FFFFFF",
          secondary: "#FFC107",
          "secondary-content": "#FFFFFF",
          accent: "#4CAF50",
          "accent-content": "#FFFFFF",
          neutral: "#FFFFFF",
          "neutral-content": "#212121",
          "base-100": "#212121",
          "base-200": "#333333",
          "base-300": "#424242",
          "base-content": "#FFFFFF",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          error: "#F44336",
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};