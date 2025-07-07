describe('InventoryPage: Footer section', { testIsolation: false }, () => {
  let standardUser;

  before(() => {
    cy.getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
    });
    cy.visit('/');
    cy.then(() => {
      cy.loginPage_FillLoginForm(standardUser);
    });
    cy.then(() => {
      cy.get(loginPage.loginButton).click();
    });
  });
});
