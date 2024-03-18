import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      heading: ["Harmattan", "system-ui"],
    },

    colors: {
      black: {
        300: "#292929",
        500: "#000000",
      },
      blue: {
        500: "#0086B0",
      },
      white: {
        100: "#FFFFFF",
        200: "#FDFEFF",
      },
      grey: {
        100: "#808080D1",
      },
    },
    extend: {},
  },
  plugins: [],
});


