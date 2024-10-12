import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://automationteststore.com/',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      username: 'oaculov@gmail.com',
      password: '029721275hH',
      pasvProd: "https://coding.pasv.us"
    }
  },
});
