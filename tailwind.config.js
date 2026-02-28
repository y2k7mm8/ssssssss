/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAF7F2",
        surface: "#FFFFFF",
        text: "#111827",
        muted: "#6B7280",
        accent: "#14B8A6",
        accent2: "#0EA5E9",
        stroke: "rgba(17,24,39,0.10)",
        stroke2: "rgba(17,24,39,0.06)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17,24,39,0.10)",
        card: "0 8px 24px rgba(17,24,39,0.08)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
