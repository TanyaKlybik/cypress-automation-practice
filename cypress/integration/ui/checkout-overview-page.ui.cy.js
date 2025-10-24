import { checkoutInfo } from '../../test-data/checkout-info-page.test-data';
import { productNames } from '../../test-data/products.test-data';
const firstProduct = productNames.backpack;
const secondProduct = productNames.bike;
const thirdProduct = productNames.tshirt;
const price = parseFloat(thirdProduct.price);
const taxPercent = checkoutInfo.taxPercent;
const expectedTax = +((price * taxPercent) / 100).toFixed(2);
const expectedTotal = +(price + expectedTax).toFixed(2);

describe('CheckoutOverviewPage: Given the "Checkout: Overview" page is open', { testIsolation: false }, () => {
  let standardUser;

  before(() => {
    cy.getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
      cy.visit('/');
      cy.loginPage_FillLoginForm(standardUser);
      cy.get(loginPage.loginButton).click();
      cy.resetAppState();
      cy.contains(inventoryPage.inventoryItemName, thirdProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).click();
        });
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutInfo.testDataUser);
    });
  });

  context('CheckoutOverviewPage: When user is on the Checkout Overview page', () => {
    it('CheckoutOverviewPage: Then Overview title should be visible', () => {
      cy.get(checkOutOverviewPage.overviewTitle).should('contain.text', l10n.checkOutOverviewPage.overviewTitle);
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
    it('CheckoutOverviewPage: Then Summary info label should be visible', () => {
      cy.get(checkOutOverviewPage.summaryInfoLabel).should('contain.text', l10n.checkOutOverviewPage.summaryInfoLabel);
    });
    it('CheckoutOverviewPage: Then Summary subtotal label should be visible', () => {
      cy.get(checkOutOverviewPage.summarySubtotal).should('contain.text', l10n.checkOutOverviewPage.summarySubtotalLabel);
    });
    it('CheckoutOverviewPage: Then Summary tax label should be visible', () => {
      cy.get(checkOutOverviewPage.summaryTax).should('contain.text', l10n.checkOutOverviewPage.summaryTaxLabel);
    });
    it('CheckoutOverviewPage: Then Summary total label should be visible', () => {
      cy.get(checkOutOverviewPage.summaryTotal).should('contain.text', l10n.checkOutOverviewPage.summaryTotalLabel);
    });
    it('CheckoutOverviewPage: Then Total value should equal Subtotal plus Tax', () => {
      cy.get(checkOutOverviewPage.summarySubtotal)
        .invoke('text')
        .then((text) => {
          const subtotal = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(subtotal).to.eq(price);
        });
      cy.get(checkOutOverviewPage.summaryTax)
        .invoke('text')
        .then((text) => {
          const tax = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(tax).to.eq(expectedTax);
        });
      cy.get(checkOutOverviewPage.summaryTotal)
        .invoke('text')
        .then((text) => {
          const total = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(total).to.eq(expectedTotal);
        });
    });
  });

  context('CheckoutOverviewPage: When user clicks Cancel', () => {
    before(() => {
      cy.get(checkOutOverviewPage.cancelButton).click();
    });
    it('CheckoutOverviewPage: Then User should be navigated back to the Inventory page', () => {
      cy.url().should('eq', urls.inventoryPage);
      cy.get(inventoryPage.inventoryTitle).should('contain.text', l10n.inventoryPage.inventoryTitle);
    });
    after(() => {
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutInfo.testDataUser);
    });
  });

  context('CheckoutOverviewPage: When user clicks Finish', () => {
    before(() => {
      cy.get(checkOutOverviewPage.finishButton).click();
    });
    it('CheckoutOverviewPage: Then User should be navigated to the Checkout Complete page', () => {
      cy.url().should('eq', urls.checkoutCompletePage);
      cy.get(checkOutCompletePage.completeTitle).should('contain.text', l10n.checkOutCompletePage.completeTitle);
    });
    after(() => {
      cy.get(checkOutCompletePage.backHomeButton).click();
    });
  });

  context('CheckoutOverviewPage: When user adds a random number of products', () => {
    before(() => {
      checkoutInfo.indicesOfProducts.forEach((index) => {
        cy.get(inventoryPage.inventoryItem).eq(index).find(inventoryPage.addToCartButton).click();
        cy.get(inventoryPage.inventoryItemName)
          .eq(index)
          .invoke('text')
          .then((text) => {
            if (text === 'Test.allTheThings() T-Shirt (Red)') {
              text = 'Sauce Labs T-Shirt (Red)';
            }
            checkoutInfo.chosenProducts.push(Object.values(productNames).find((product) => product.name === text));
          });
      });
      cy.get(cartPage.cartIcon).click();
    });
    it('CheckoutOverviewPage: Then Subtotal should equal sum of all product prices', () => {
      const subtotal = checkoutInfo.chosenProducts.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2);
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutInfo.testDataUser);
      cy.get(checkOutOverviewPage.summarySubtotal)
        .invoke('text')
        .then((text) => {
          const actualSubtotal = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(actualSubtotal).to.be.closeTo(parseFloat(subtotal), 0.01);
        });
    });
    it('CheckoutOverviewPage: Then Total should equal Subtotal plus Tax', () => {
      const taxPercent = checkoutInfo.taxPercent;
      const subtotal = checkoutInfo.chosenProducts.reduce((sum, product) => sum + parseFloat(product.price), 0);
      const expectedTax = +((subtotal * taxPercent) / 100).toFixed(2);
      const expectedTotal = +(subtotal + expectedTax).toFixed(2);
      cy.get(checkOutOverviewPage.summarySubtotal)
        .invoke('text')
        .then((text) => {
          const actualSubtotal = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(actualSubtotal).to.be.closeTo(subtotal, 0.01);
        });
      cy.get(checkOutOverviewPage.summaryTax)
        .invoke('text')
        .then((text) => {
          const actualTax = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(actualTax).to.be.closeTo(expectedTax, 0.01);
        });
      cy.get(checkOutOverviewPage.summaryTotal)
        .invoke('text')
        .then((text) => {
          const actualTotal = parseFloat(text.replace(/[^\d.]/g, ''));
          expect(actualTotal).to.be.closeTo(expectedTotal, 0.01);
        });
    });
  });
});
