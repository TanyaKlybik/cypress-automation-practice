describe('CheckoutOverviewPage: Given the "Checkout: Overview" page is open', { testIsolation: false }, () => {
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
            //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/11
            cy.get(inventoryPage.addToCartButton).first().click();
            cy.get(cartPage.cartIcon).click();
            cy.get(cartPage.checkoutButton).click();
            cy.checkoutInfo_FillFormAndContinue('John', 'Doe', '12345');
          });
        });
    });

    context('CheckoutOverviewPage: When user is on the "Checkout: Overview" page', () => {
      it('CheckoutOverviewPage: Then Overview title should be visible', () => {
        cy.get(checkOutOverviewPage.overviewTitle).should('have.text', l10n.checkOutOverviewPage.overviewTitle);
      });
      it('CheckoutOverviewPage: Then Cancel button should be visible', () => {
        cy.get(checkOutOverviewPage.cancelButton).should('be.visible');
      });
      it('CheckoutOverviewPage: Then Finish button should be visible', () => {
        cy.get(checkOutOverviewPage.finishButton).should('be.visible');
      });
      it('CheckoutOverviewPage: Then only 1 Cart item should be displayed with name and price', () => {
        cy.get(checkOutOverviewPage.itemContainer).should('have.length', 1);
        cy.get(checkOutOverviewPage.itemQuantity).should('have.length', 1);
        cy.get(checkOutOverviewPage.itemName).should('be.visible');
        cy.get(checkOutOverviewPage.itemPrice).should('be.visible');
      });
      it('CheckoutOverviewPage: Then Summary labels should be visible', () => {
        cy.get(checkOutOverviewPage.summaryInfoLabel).should('contain.text', l10n.checkOutOverviewPage.summaryInfoLabel);
        cy.get(checkOutOverviewPage.summarySubtotal).should('contain.text', l10n.checkOutOverviewPage.summarySubtotalLabel);
        cy.get(checkOutOverviewPage.summaryTax).should('contain.text', l10n.checkOutOverviewPage.summaryTaxLabel);
        cy.get(checkOutOverviewPage.summaryTotal).should('contain.text', l10n.checkOutOverviewPage.summaryTotalLabel);
        });
      it('CheckoutOverviewPage: Then Total value should equal Subtotal + Tax', () => {
        let subtotal, tax, total;

        cy.get(checkOutOverviewPage.summarySubtotal).invoke('text').then(text => {
            subtotal = parseFloat(text.replace(/[^\d.]/g, ''));
          });
        cy.get(checkOutOverviewPage.summaryTax).invoke('text').then(text => {
            tax = parseFloat(text.replace(/[^\d.]/g, ''));
          });
        cy.get(checkOutOverviewPage.summaryTotal).invoke('text').then(text => {
            total = parseFloat(text.replace(/[^\d.]/g, ''));
            expect(total).to.be.closeTo(subtotal + tax, 0.01);
          });
      });
    });

    context('CheckoutOverviewPage: When user clicks "Cancel"', () => {
      it('CheckoutOverviewPage: Then User should be navigated back to the Inventory page', () => {
        cy.get(checkOutOverviewPage.cancelButton).click();
        cy.url().should('eq', urls.inventoryPage);
        cy.get(inventoryPage.inventoryTitle).should('have.text', l10n.inventoryPage.inventoryTitle);
      });
      after(() => {
        cy.get(cartPage.cartIcon).click();
        cy.get(cartPage.checkoutButton).click();
        cy.checkoutInfo_FillFormAndContinue('John', 'Doe', '12345');
      });
    });

    context('CheckoutOverviewPage: When user clicks "Finish"', () => {
      it('CheckoutOverviewPage: Then User should be navigated to the Checkout Complete page', () => {
        cy.get(checkOutOverviewPage.finishButton).click();
        cy.url().should('eq', urls.checkoutCompletePage);
        cy.get(checkOutCompletePage.completeTitle).should('have.text', l10n.checkOutCompletePage.completeTitle);
      });
    });
});
