// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'Outfit': ['Outfit', 'sans-serif'],
      'Sen': ['"Sen"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {
      colors:{
        "primary":"#3F9142",
        "blue":"#0890FF"
        
      },
      screens: {
        'tab': '768px',
        'medium':'1120px',
        'testMap':'1380px' ,// Custom media query for 400px screens
      },
    },
  },
  plugins: [],
};

