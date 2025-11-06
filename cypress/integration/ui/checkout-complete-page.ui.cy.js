import { checkoutCompletePageTestData } from '../../test-data/checkout-complete-page.test-data';

describe('CheckoutCompletePage: Given the "Checkout: Complete!" page is open', { testIsolation: false }, () => {
  let standardUser;

  before(() => {
    cy.getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
      cy.visit('/');
      cy.loginPage_FillLoginForm(standardUser);
      cy.get(loginPage.loginButton).click();
      cy.resetAppState();
      cy.get(inventoryPage.addToCartButton).first().click();
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
      cy.checkoutInfo_FillFormAndContinue(checkoutCompletePageTestData.testDataUser);
      cy.get(checkOutOverviewPage.finishButton).click();
    });
  });

  context('CheckoutCompletePage: When user is on the Checkout Complete page', () => {
    it('CheckoutCompletePage: Then Complete page title should be visible', () => {
      cy.get(checkOutCompletePage.completeTitle).should('have.text', l10n.checkOutCompletePage.completeTitle);
    });
    it('CheckoutCompletePage: Then Complete header should be visible', () => {
      cy.get(checkOutCompletePage.completeHeader).should('have.text', l10n.checkOutCompletePage.completeHeader);
    });
    it('CheckoutCompletePage: Then Complete message text should be visible', () => {
      cy.get(checkOutCompletePage.completeText).should('have.text', l10n.checkOutCompletePage.completeText);
    });
    it('CheckoutCompletePage: Then Back Home button should be visible', () => {
      cy.get(checkOutCompletePage.backHomeButton).should('be.visible').and('have.text', l10n.checkOutCompletePage.backHomeButton);
    });
  });

  context('CheckoutCompletePage: When user clicks Back Home', () => {
    before(() => {
      cy.get(checkOutCompletePage.backHomeButton).click();
    });
    it('CheckoutCompletePage: Then user should be navigated to Inventory page', () => {
      cy.url().should('eq', urls.inventoryPage);
      cy.get(inventoryPage.inventoryTitle).should('have.text', l10n.inventoryPage.inventoryTitle);
      cy.get(inventoryPage.inventoryContainer).should('be.visible');
    });
  });
});
