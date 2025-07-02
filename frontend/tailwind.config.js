 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // ✅ Needed for your Vite root HTML file
    "./src/**/*.{js,ts,jsx,tsx}" // ✅ This watches all files in src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
