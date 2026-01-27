const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    slowTestThreshold: 200,
    chromeWebSecurity: false,
    numTestsKeptInMemory: 200,
    video: false,
    videosFolder: './cypress/reports/videos',
    screenshotsFolder: './cypress/reports/screenshots',
    viewportWidth: 1600,
    viewportHeight: 1200,
    modifyObstructiveCode: false,
    pageLoadTimeout: 25000,
    defaultCommandTimeout: 9000,
    requestTimeout: 9000,
    responseTimeout: 25000,

    setupNodeEvents(on, config) {},
  },

  env: {
    envName: 'dev',
  },
});
