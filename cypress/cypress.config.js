const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "none",   // так как у тебя чистый JS
      bundler: "vite"      // можно webpack, но vite проще
    }
  }
});
