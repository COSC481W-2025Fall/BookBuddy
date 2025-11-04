/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(600px 300px at 50% -20%, rgba(99,102,241,0.25), rgba(255,255,255,0))",
      },
    },
  },
  plugins: [],
};
