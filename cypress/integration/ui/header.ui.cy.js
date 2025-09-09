describe('InventoryPage.Header.STANDARD: Given user is logged in and inventory page is open', { testIsolation: false }, () => {
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

  context('InventoryPage.Header.STANDARD: When menu is opened', () => {
    before(() => {
      cy.get(menu.menuButton).click();
    });
    it('Menu: Then Burger menu is visible', () => {
      cy.get(menu.menuPanel).should('be.visible');
    });
    it('Menu: Then All Items option is present in the menu', () => {
      cy.get(menu.allItems).should('be.visible').and('contain.text', 'All Items');
    });
    it('Menu: Then About option is present in the menu', () => {
      cy.get(menu.about).should('be.visible').and('contain.text', 'About');
    });
    it('Menu: Then Reset App State option is present in the menu', () => {
      cy.get(menu.resetAppState).should('be.visible').and('contain.text', 'Reset App State');
    });
    it('Menu: Then Logout option is present in the menu', () => {
      cy.get(menu.logoutButton).should('be.visible').and('contain.text', 'Logout');
    });
    it('Menu: Then Close (X) button is visible in the menu', () => {
      cy.get(menu.closeButton).should('be.visible');
    });
  });

  context('InventoryPage.Header.STANDARD: When user clicks the All Items menu option', () => {
    before(() => {
      cy.get(menu.allItems).click();
    });

    it('Menu: Then User stays on the Inventory page', () => {
      cy.url().should('include', '/inventory.html');
    });
  });

  context('InventoryPage.Header.STANDARD: When user clicks the About menu option', () => {
    it('Menu: Then User is redirected to the About page', () => {
      cy.get(menu.about).should('have.attr', 'href', urls.aboutCompanyPage).and('not.have.attr', 'target');
    });
  });

  context('InventoryPage.Header.STANDARD: When user clicks the Reset App State menu option', () => {
    before(() => {
      cy.get(menu.resetAppState).click();
    });
    it('Menu: Then App state is reset (cart is empty, filters reset, etc.)', () => {
      cy.get(cartPage.cartIcon).should('have.text', '');
    });
  });

  context('InventoryPage.Header.STANDARD: When user closes the menu', () => {
    before(() => {
      cy.get(menu.closeButton).click();
    });
    it('Menu: Then menu panel is closed', () => {
      cy.get(menu.menuPanel).should('not.be.visible');
    });
  });

  context('InventoryPage.Header.STANDARD: When user clicks the Cart icon', () => {
    before(() => {
      cy.get(cartPage.cartIcon).click();
    });

    it('Then Cart: User is redirected to the cart page', () => {
      cy.url().should('include', '/cart.html');
      cy.get(cartPage.cartTitle).should('have.text', l10n.cartPage.cartTitle).and('be.visible');
    });
  });
});
