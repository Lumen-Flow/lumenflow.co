/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  tailwindStylesheet: "./src/app/globals.css",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
