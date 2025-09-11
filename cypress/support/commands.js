// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('getUserDataByRole', (role) => {
  if (!Object.values(userRoles).includes(role)) {
    throw new Error(`Invalid user: ${role}`);
  }

  const user = Cypress.env(`${role}-data`);
  if (user) {
    cy.log(`User found in environment for role: ${role}`);
    return cy.wrap(user);
  }

  return cy.fixture(`../sensitive-data/${Cypress.env('envName')}-users.json`).then((users) => {
    const userData = users[role];
    if (!userData) {
      throw new Error(`User data not found for role: ${role}`);
    }
    Cypress.env(`${role}-data`, userData);
    return cy.wrap(userData);
  });
});

Cypress.Commands.add('loginPage_FillLoginForm', (user) => {
  const { username, password } = user;
  cy.get(loginPage.usernameInput).type(username, { delay: 0 });
  cy.get(loginPage.passwordInput).type(password, { log: false, delay: 0 });
});

Cypress.Commands.add('logout', () => {
  cy.get(menu.menuButton).click();
  cy.then(() => {
    cy.get(menu.logoutButton).click();
  });
});

Cypress.Commands.add('shouldBeSorted', (itemsSelector, fieldSelector) => {
  cy.get(itemsSelector)
    .find(fieldSelector)
    .then(($els) => {
      const names = Cypress._.map($els, 'innerText');
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sorted);
    });
});

Cypress.Commands.add('getCartCount', () => {
  return cy.get('body').then(($body) => {
    if ($body.find(cartPage.cartBadge).length) {
      return cy
        .get(cartPage.cartBadge)
        .invoke('text')
        .then((text) => parseInt(text, 10));
    }
    return 0;
  });
});

Cypress.Commands.add('resetAppState', () => {
  cy.get(menu.menuButton).click();
  cy.get(menu.resetAppState).click();
  cy.get(menu.closeButton).click();
});

Cypress.Commands.add('checkoutInfo_FillFormAndContinue', (firstName = 'John', lastName = 'Doe', postalCode = '12345') => {
  cy.get(checkOutInfoPage.firstNameInput).clear().type(firstName);
  cy.get(checkOutInfoPage.lastNameInput).clear().type(lastName);
  cy.get(checkOutInfoPage.postalCodeInput).clear().type(postalCode);
  cy.get(checkOutInfoPage.continueButton).click();
  cy.url().should('eq', urls.checkoutOverviewPage);
});