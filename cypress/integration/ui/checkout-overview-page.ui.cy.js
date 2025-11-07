import { checkoutOverviewPageTestData } from '../../test-data/checkout-overview-page.test-data';

describe('CheckoutOverviewPage: Given the Checkout Overview page is open', { testIsolation: false }, () => {
  let standardUser;
  before(() => {
    cy.getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
      cy.visit('/');
      cy.loginPage_FillLoginForm(standardUser);
      cy.get(loginPage.loginButton).click();
      cy.resetAppState();
      cy.contains(inventoryPage.inventoryItemName, checkoutOverviewPageTestData.onesie.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).click();
        });
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutOverviewPageTestData.testDataUser);
    });
  });

  context('CheckoutOverviewPage: When user is on the Checkout Overview page', () => {
    it('CheckoutOverviewPage: Then Overview title should be visible', () => {
      cy.get(checkOutOverviewPage.overviewTitle).should('contain.text', l10n.checkOutOverviewPage.overviewTitle);
    });
    it('CheckoutOverviewPage: Only 1 cart item should be displayed', () => {
      cy.get(checkOutOverviewPage.itemContainer).should('have.length', 1);
      cy.get(checkOutOverviewPage.itemQuantity).should('have.length', 1);
    });
    it('CheckoutOverviewPage: Cart item name should be visible', () => {
      cy.get(checkOutOverviewPage.itemName).should('be.visible');
    });
    it('CheckoutOverviewPage: Cart item price should be visible', () => {
      cy.get(checkOutOverviewPage.itemPrice).should('be.visible');
    });
    it('CheckoutOverviewPage: Payment Information should be correct', () => {
      cy.get(checkOutOverviewPage.paymentInfoLabel).should('have.text', l10n.checkOutOverviewPage.paymentInfoLabel);
    });
    it('CheckoutOverviewPage: Shipping Information label should be correct', () => {
      cy.get(checkOutOverviewPage.shippingInfoLabel).should('have.text', l10n.checkOutOverviewPage.shippingInfoLabel);
    });
    it('CheckoutOverviewPage: Shipping Information value should be correct', () => {
      cy.get(checkOutOverviewPage.shippingInfoValue).should('have.text', l10n.checkOutOverviewPage.shippingInfoValue);
    });
    it('CheckoutOverviewPage: Then Summary info label should be visible', () => {
      cy.get(checkOutOverviewPage.summaryInfoLabel).should('have.text', l10n.checkOutOverviewPage.summaryInfoLabel);
    });
    it('CheckoutOverviewPage: Then Summary subtotal label should be correct', () => {
      cy.get(checkOutOverviewPage.summarySubtotal).should('have.text', `${l10n.checkOutOverviewPage.summarySubtotalLabel}: ${checkoutOverviewPageTestData.onesie.price}`);
    });
    it('CheckoutOverviewPage: Then Summary tax label should be correct', () => {
      cy.get(checkOutOverviewPage.summaryTax)
        .invoke('text')
        .then((text) => {
          expect(requirements.parsePrice(text)).to.eq(requirements.calculateTax(checkoutOverviewPageTestData.onesie.price));
        });
    });
    it('CheckoutOverviewPage: Then Summary total label should be visible', () => {
      requirements.checkTotal(checkOutOverviewPage.summarySubtotal, checkOutOverviewPage.summaryTax, checkOutOverviewPage.summaryTotal);
    });
    it('CheckoutOverviewPage: Then Cancel button should be visible', () => {
      cy.get(checkOutOverviewPage.cancelButton).should('be.visible');
    });
    it('CheckoutOverviewPage: Then Finish button should be visible', () => {
      cy.get(checkOutOverviewPage.finishButton).should('be.visible');
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
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutOverviewPageTestData.testDataUser);
    });
  });

  context('CheckoutOverviewPage: When user clicks Finish', () => {
    before(() => {
      cy.get(checkOutOverviewPage.finishButton).click();
    });
    it('CheckoutOverviewPage: User should be navigated to the Checkout Complete page', () => {
      cy.url().should('eq', urls.checkoutCompletePage);
    });
    it('CheckoutCompletePage: Page should display the complete title', () => {
      cy.get(checkOutCompletePage.completeTitle).should('have.text', l10n.checkOutCompletePage.completeTitle);
    });
    after(() => {
      cy.get(checkOutCompletePage.backHomeButton).click();
    });
  });

  context('CheckoutOverviewPage: When user adds 2 more products', () => {
    before(() => {
      cy.get(menu.menuButton).click();
      cy.get(menu.allItems).click();
      cy.contains(inventoryPage.inventoryItemName, checkoutOverviewPageTestData.tshirt.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).click();
        });
      cy.contains(inventoryPage.inventoryItemName, checkoutOverviewPageTestData.jacket.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).click();
        });
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutOverviewPageTestData.testDataUser);
    });
    it('CheckoutOverviewPage: Then Subtotal value should equal sum of all product prices', () => {
      cy.get(checkOutOverviewPage.summarySubtotal)
        .invoke('text')
        .then((text) => {
          const expectedSubtotal = requirements.sumPrices([checkoutOverviewPageTestData.tshirt.price, checkoutOverviewPageTestData.jacket.price]);
          expect(requirements.parsePrice(text)).to.eq(expectedSubtotal);
        });
    });
    it('CheckoutOverviewPage: Then Tax value should be correct', () => {
      const expectedTax = requirements.calculateTaxFromPrices([checkoutOverviewPageTestData.onesie.price, checkoutOverviewPageTestData.tshirt.price, checkoutOverviewPageTestData.jacket.price]);
    });
    it('CheckoutOverviewPage: Then Total sum should be correct', () => {
      requirements.checkTotal(checkOutOverviewPage.summarySubtotal, checkOutOverviewPage.summaryTax, checkOutOverviewPage.summaryTotal);
    });
    after(() => {
      cy.get(checkOutOverviewPage.finishButton).click();
      cy.get(checkOutCompletePage.backHomeButton).click();
    });
  });
});
