const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "none",   
      bundler: "vite"     
    }
  }
});
