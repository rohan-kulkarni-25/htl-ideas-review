/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1350px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '750px' },
      //
    },
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },

        height: {108:"28rem", 128: "32rem", 160: "40rem", 180: '45rem', 200: '50rem' },
        'purple': { DEFAULT: '#8C52FF', '50': '#FFFFFF', '100': '#F8F5FF', '200': '#DDCCFF', '300': '#C2A4FF', '400': '#A77BFF', '500': '#8C52FF', '600': '#671AFF', '700': '#4B00E1', '800': '#3900A9', '900': '#260071' },


    },
  },
  plugins: [],
};
