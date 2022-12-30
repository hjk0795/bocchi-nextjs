import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  env: {
    questionMarkImgUrl: "https://cdn-icons-png.flaticon.com/512/84/84042.png"
  }
});
