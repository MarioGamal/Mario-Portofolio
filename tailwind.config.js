/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2.5rem" },
      screens: { xl: "1240px" },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Classical scale around a 17px body.
        sm: ["0.875rem", { lineHeight: "1.45" }],
        base: ["1.0625rem", { lineHeight: "1.6" }],
        lg: ["1.3125rem", { lineHeight: "1.45" }],
        xl: ["1.75rem", { lineHeight: "1.2" }],
        "2xl": ["2.25rem", { lineHeight: "1.1" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
