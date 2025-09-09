describe('InventoryPage.Footer.Standard: Footer section', { testIsolation: false }, () => {
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
      cy.then(() => {
        cy.resetAppState();
      });
    });
  });

  context('InventoryPage.Footer.Standard: When checking footer content', () => {
    before(() => {
      cy.get(inventoryPage.inventoryTitle).should('have.text', l10n.inventoryPage.inventoryTitle).and('be.visible');
    });
    it('Then Footer should contain copyright', () => {
      cy.get(footer.copyright)
        .invoke('text')
        .then((text) => {
          expect(text).to.match(/© 20\d{2}/);
          expect(text).to.include('Sauce Labs');
        });
    });
    it.skip('Then Footer should contain a link to Terms of Service ', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/8
      cy.get(footer.copyright).should('have.attr', 'href', urls.termsOfService).and('be.visible');
    });
    it.skip('Then Footer should contain a link to Privacy Policy', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/9
      cy.get(footer.copyright).should('have.attr', 'href', urls.privacyPolicy).and('be.visible');
    });
  });

  context('InventoryPage.Footer.Standard: When user clicks on the Twitter icon', () => {
    it('Then Footer should contain the Twitter icon and User is redirected to the Twitter page', () => {
      cy.get(footer.twitterIcon).should('have.attr', 'href', urls.twitterPage).and('be.visible');
    });
  });

  context('InventoryPage.Footer.Standard: When user clicks on the Facebook icon', () => {
    it('Then Footer should contain the Facebook icon amd User is redirected to the Facebook page', () => {
      cy.get(footer.facebookIcon).should('have.attr', 'href', urls.facebookPage).and('be.visible');
    });
  });

  context('InventoryPage.Footer.Standard: When user clicks on the LinkedIn icon', () => {
    it('Then Footer should contain the LinkedIn icon and User is redirected to the LinkedIn page', () => {
      cy.get(footer.linkedinIcon).should('have.attr', 'href', urls.linkedinPage).and('be.visible');
    });
  });
});
