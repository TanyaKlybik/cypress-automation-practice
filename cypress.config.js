// const { defineConfig } = require('cypress');
// const fs = require('fs');

// let apiAuth = {};
// try {
//   apiAuth = JSON.parse(fs.readFileSync('./cypress/sensitive-data/env-users.json', 'utf8'));
//   console.log('Loaded apiAuth from file:', apiAuth);
// } catch (err) {
//   console.error('Cannot load env-users.json:', err.message);
// }

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'https://www.saucedemo.com',
//     setupNodeEvents(on, config) {
//       console.log('Running tests in:', config.env.environment || 'not set');
//       config.env.apiAuth = apiAuth;
//       return config;
//     },
//     specPattern: '**/*.cy.{js,jsx,ts,tsx}',
//     supportFile: 'cypress/support/e2e.js',
//   },
//   env: {
//     envName: 'env',
//   },
// });
const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      const filePath = path.resolve(__dirname, 'cypress/sensitive-data/env-users.json');
      try {
        const apiAuth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log('Loaded apiAuth users:', Object.keys(apiAuth).join(', '));
        config.env.apiAuth = apiAuth; // сохраняем в окружение Cypress
      } catch (err) {
        console.error('Cannot load env-users.json:', err.message);
      }
      return config;
    },
  },

  env: {
    envName: 'env',
  },
});
