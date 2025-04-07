// tailwind.config.js
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,svelte,ts}',  // Make sure to include .svelte files
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1A1F24", // Dark background color
          secondary: "#2C3E50", // Dark blue background elements
          accent: "#34495E", // Muted blue for borders/buttons
          lightAccent: "#5D6D7E", // Soft blue for hover states
          teal: "#16A085", // Teal for primary action buttons
          brightBlue: "#2980B9", // Bright blue for links/buttons
          slateBlue: "#4C6A92", // Slate blue for hover/active states
          lightGray: "#BDC3C7", // Light gray for text
        },
        fontFamily: {
          mono: ['"Noto Sans Mono"', 'monospace'],
          sans: ['"Open Sans"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  