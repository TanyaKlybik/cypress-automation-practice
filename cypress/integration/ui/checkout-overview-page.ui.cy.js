import { checkoutInfo } from '../../test-data/checkout-info-page.test-data';

describe('CheckoutOverviewPage: Given the "Checkout: Overview" page is open', { testIsolation: false }, () => {
  let standardUser;

  before(() => {
    cy.getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
    });
    cy.visit('/');
    cy.then(() => {
      cy.loginPage_FillLoginForm(standardUser);
      cy.get(loginPage.loginButton).click();
      cy.resetAppState();
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/11
      cy.get(inventoryPage.addToCartButton).first().click();
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutInfo.testDataUser);
    });
  });

  context('CheckoutOverviewPage: When user is on the Checkout Overview page', () => {
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
    it('CheckoutOverviewPage: Then Total value should equal Subtotal plus Tax', () => {
      let subtotal, tax, total;

      cy.get(checkOutOverviewPage.summarySubtotal)
        .invoke('text')
        .then((text) => {
          subtotal = parseFloat(text.replace(/[^\d.]/g, ''));
        });
      cy.get(checkOutOverviewPage.summaryTax)
        .invoke('text')
        .then((text) => {
          tax = parseFloat(text.replace(/[^\d.]/g, ''));
        });
      cy.get(checkOutOverviewPage.summaryTotal)
        .invoke('text')
        .then((text) => {
          total = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(total).to.be.closeTo(subtotal + tax, 0.01);
        });
    });
  });

  context('CheckoutOverviewPage: When user clicks Cancel', () => {
    before(() => {
      cy.get(checkOutOverviewPage.cancelButton).click();
    });
    it('CheckoutOverviewPage: Then User should be navigated back to the Inventory page', () => {
      cy.url().should('eq', urls.inventoryPage);
      cy.get(inventoryPage.inventoryTitle).should('have.text', l10n.inventoryPage.inventoryTitle);
    });
    after(() => {
      cy.get(cartPage.cartIcon).click();
      cy.then(() => {
        cy.get(cartPage.checkoutButton).click();
        cy.checkoutInfo_FillFormAndContinue(checkoutInfo.testDataUser);
      });
    });
  });

  context('CheckoutOverviewPage: When user clicks Finish', () => {
    before(() => {
      cy.get(checkOutOverviewPage.finishButton).click();
    });
    it('CheckoutOverviewPage: Then User should be navigated to the Checkout Complete page', () => {
      cy.url().should('eq', urls.checkoutCompletePage);
      cy.get(checkOutCompletePage.completeTitle).should('have.text', l10n.checkOutCompletePage.completeTitle);
    });
  });

  context('CheckoutOverviewPage: When user adds all 6 products', () => {
    let productsData = [];

    before(() => {
      cy.get(menu.menuButton).click();
      cy.get(menu.allItems).click();
      cy.get(inventoryPage.inventoryItem).each(($el, index) => {
        cy.get(inventoryPage.inventoryItemName)
          .eq(index)
          .invoke('text')
          .then((name) => {
            cy.get(inventoryPage.inventoryItemDesc)
              .eq(index)
              .invoke('text')
              .then((desc) => {
                cy.get(inventoryPage.inventoryItemPrice)
                  .eq(index)
                  .invoke('text')
                  .then((priceText) => {
                    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                    productsData.push({ name: name.trim(), desc: desc.trim(), price });
                  });
              });
          });
        cy.wrap($el).find(inventoryPage.addToCartButton).click();
      });
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutInfo.testDataUser);
    });
    it('CheckoutOverviewPage: Then 6 products should be displayed with correct name, description and price', () => {
      cy.get(checkOutOverviewPage.itemContainer).should('have.length', 6);
      cy.get(checkOutOverviewPage.itemContainer).each(($el, index) => {
        cy.wrap($el).find(checkOutOverviewPage.itemName).should('have.text', productsData[index].name);
        cy.wrap($el).find(checkOutOverviewPage.itemDescription).should('have.text', productsData[index].desc);
        cy.wrap($el)
          .find(checkOutOverviewPage.itemPrice)
          .invoke('text')
          .then((text) => {
            const price = parseFloat(text.replace(/[^\d.]/g, ''));
            expect(price).to.eq(productsData[index].price);
          });
      });
    });
    it('CheckoutOverviewPage: Then Subtotal should equal sum of all product prices', () => {
      const expectedSubtotal = productsData.reduce((acc, p) => acc + p.price, 0);

      cy.get(checkOutOverviewPage.summarySubtotal)
        .invoke('text')
        .then((text) => {
          const subtotal = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(subtotal).to.be.closeTo(expectedSubtotal, 0.01);
        });
    });
    it('CheckoutOverviewPage: Then Total should equal Subtotal plus Tax', () => {
      let subtotal, tax, total;

      cy.get(checkOutOverviewPage.summarySubtotal)
        .invoke('text')
        .then((text) => {
          subtotal = parseFloat(text.replace(/[^\d.]/g, ''));
        });
      cy.get(checkOutOverviewPage.summaryTax)
        .invoke('text')
        .then((text) => {
          tax = parseFloat(text.replace(/[^\d.]/g, ''));
        });
      cy.get(checkOutOverviewPage.summaryTotal)
        .invoke('text')
        .then((text) => {
          total = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(total).to.be.closeTo(subtotal + tax, 0.01);
        });
    });
  });
});
