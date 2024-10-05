import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://automationteststore.com/',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
