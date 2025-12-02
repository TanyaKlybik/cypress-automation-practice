const { defineConfig } = require('cypress');
const fs = require('fs');

let apiAuth = {};
try {
  apiAuth = JSON.parse(fs.readFileSync('./cypress/sensitive-data/api-auth.json', 'utf8'));
  console.log('Loaded apiAuth from file:', apiAuth);
} catch (err) {
  console.error('Cannot load api-auth.json:', err.message);
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      console.log('Running tests in:', config.env.environment || 'not set');
      config.env.apiAuth = apiAuth;
      return config;
    },
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
  },
  env: {
    envName: 'env',
    apiAuth,
  },
});

console.log('Loaded apiAuth from file:', apiAuth);
