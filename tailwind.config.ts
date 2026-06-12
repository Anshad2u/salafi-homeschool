import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        admin: { DEFAULT: "#0f766e", soft: "#ccfbf1", dark: "#115e59" },
        teacher: { DEFAULT: "#be185d", soft: "#fce7f3", dark: "#9d174d" },
        student: { DEFAULT: "#7c3aed", soft: "#ede9fe", dark: "#6d28d9" },
      },
      borderRadius: { card: "1rem" },
    },
  },
  plugins: [],
};

export default config;
