import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    colors: {
      Primary: "#00AA5B",
      Destructive: "#FF0000",
      ...require("tailwindcss/colors"),
    },
    extend: {
      boxShadow: {
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    require("tailwind-scrollbar-hide"),
  ],
  daisyui: {
    themes: false,
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "dui-",
    logs: false,
    themeRoot: ":root",
  },
} satisfies Config;

export default config;
