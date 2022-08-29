/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "0px",
        md: "768px",
        lg: "1080px",
        xl: "1440px",
      },
      colors: {
        backdrop: "#00000080",
        success: {
          green: "#4BB543",
        },
        purple: {
          300: "#C75AF6",
          700: "#AD1FEA",
        },
        blue: {
          50: "#F7F8FD",
          100: "#F2F4FF",
          300: "#7C91F9",
          400: "#647196",
          500: "#4661E6",
          600: "#656EA3",
          800: "#373F68",
          900: "#3A4374",
        },
        sky: {
          blue: "#62BCFA",
        },
        peach: {
          orange: "#F49F85",
        },
        red: {
          300: "#E98888",
          700: "#D73737",
        },
      },
      backgroundImage: {
        gradient: "radial-gradient(var(--radial-gradient-steps))",
      },
    },
  },
  plugins: [],
};
