/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2fbf9",
          100: "#d3f4ee",
          200: "#a8e8dd",
          300: "#76d7c9",
          400: "#40bfae",
          500: "#1fa191",
          600: "#147f75",
          700: "#13665f",
          800: "#14524d",
          900: "#134541"
        },
        sunrise: {
          50: "#fff8ed",
          100: "#ffefd3",
          200: "#ffdaad",
          300: "#ffc17a",
          400: "#ffa041",
          500: "#fb7f18",
          600: "#ec650e",
          700: "#c44b0f",
          800: "#9c3b14",
          900: "#7e3314"
        }
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(18, 79, 74, 0.12)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 15% 20%, rgba(255, 193, 122, 0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(118, 215, 201, 0.3), transparent 50%), linear-gradient(120deg, #f8f5ee 0%, #eefcf8 100%)"
      }
    }
  },
  plugins: []
};
