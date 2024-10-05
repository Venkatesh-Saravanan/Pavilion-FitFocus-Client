const flowbite = require("flowbite-react/tailwind");
const daisyui = require("daisyui");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          '950': '#1a202c',
        },
        violet: {
          '600': '#7f5af0',
        },
      },
      fontFamily: {
        Rilway: '"Raleway", sans-serif',
        Prata: '"Prata", serif',
        Oswald: '"Oswald", sans-serif'
      }
    },
  },
  
  plugins: [daisyui, flowbite.plugin()],
};