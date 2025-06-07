/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  // ✅ DaisyUI config should be INSIDE the export
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
