/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          "marine-blue": "hsl(213, 96%, 18%)", // primary text
          "purplish-blue": "hsl(243, 100%, 62%)", //tertiary text
          "pastel-blue": "hsl(228, 100%, 84%)",
          "light-blue": "hsl(206, 94%, 87%)", // step active background
          "strawberry-red": "hsl(354, 84%, 57%)", // Error color
        },
        neutral: {
          "cool-gray": "hsl(231, 11%, 63%)", //secondary text
          "light-gray": "hsl(229, 24%, 87%)", //border
          magnolia: "hsl(217, 100%, 97%)", // primary background
          alabaster: "hsl(231, 100%, 99%)", // tertiary background
        },
        footerLink: "hsl(228, 45%, 44%)",
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
        p: "600px", // mobile
        sp: "300px", // small-mobile
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
