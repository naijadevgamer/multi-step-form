/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          "marine-blue": "hsl(213, 96%, 18%)",
          "purplish-blue": "hsl(243, 100%, 62%)",
          "pastel-blue": "hsl(228, 100%, 84%)",
          "light-blue": "hsl(206, 94%, 87%)",
          "strawberry-red": "hsl(354, 84%, 57%)",
        },
        neutral: {
          "cool-gray": "hsl(231, 11%, 63%)",
          "light-gray": "hsl(229, 24%, 87%)",
          magnolia: "hsl(217, 100%, 97%)",
          alabaster: "hsl(231, 100%, 99%)",
        },
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      fontSize: {
        html: "62.5%",
        desktop: "75%",
        land: "58%",
        port: "53%",
      },
      screens: {
        "large-desktop": "1800px", // 1800px
        tl: "1200px", // tablet-landscape
        tp: "900px", // tablet-portrait
        sp: "300px", // small-phone
      },
      keyframes: {
        // Menu bar
        go: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(105%)" },
        },
      },
      animation: {
        // Menu bar animations
        go: "go 0.3s cubic-bezier(1, 0, 0, 1) both",
      },
    },
  },
  plugins: [],
};
