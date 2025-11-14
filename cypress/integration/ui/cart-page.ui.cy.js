import { cartPageTestData } from '../../test-data/cart-page.test-data';

describe('CartPage: Given cart page is open ', { testIsolation: false }, () => {
  let standardUser;
  before(() => {
    cy.getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
      cy.visit('/');
      cy.loginPage_FillLoginForm(standardUser);
      cy.get(loginPage.loginButton).click();
      cy.resetAppState();
    });
  });

  context('CartPage: When the user clicks on the cart icon', () => {
    before(() => {
      cy.get(cartPage.cartIcon).click();
    });
    it('CartPage: Then Title should display', () => {
      cy.get(cartPage.cartTitle).should('have.text', l10n.cartPage.cartTitle);
    });
    it('CartPage: Then Cart icon should display', () => {
      cy.get(cartPage.cartIcon).should('be.visible');
    });
    it('CartPage: Then QTY column header should display', () => {
      cy.contains(l10n.cartPage.qty).should('be.visible');
    });
    it('CartPage: Then Description column header  should display', () => {
      cy.contains(l10n.cartPage.description).should('be.visible');
    });
    it('CartPage: Then Continue Shopping button should display', () => {
      cy.get(cartPage.continueShoppingButton).should('be.visible').and('have.text', l10n.cartPage.continueShopping);
    });
    it('CartPage: Then Checkout button should display', () => {
      cy.get(cartPage.checkoutButton).should('be.visible').and('have.text', l10n.cartPage.checkout);
    });
    it('CartPage: Then Cart badge should not display when the cart is empty', () => {
      cy.get(cartPage.cartBadge).should('not.exist');
    });
    it('CartPage: Then no cart items should display', () => {
      cy.get(inventoryPage.inventoryItem).should('not.exist');
    });
  });

  context.skip('CartPage: When the user clicks on the Checkout button while the cart is empty', () => {
    before(() => {
      cy.get(cartPage.checkoutButton).should('be.disabled');
    });
    it.skip('CartPage: Then Checkout should not be allowed when the cart is empty', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/13
      cy.url().should('eq', urls.cartPage);
    });
  });

  context('CartPage: When the user adds items to the shopping cart', () => {
    before(() => {
      cy.get(menu.menuButton).click();
      cy.get(menu.allItems).click();
      cy.contains(inventoryPage.inventoryItemName, cartPageTestData.tshirt.name).parents(inventoryPage.inventoryItem).find(inventoryPage.addToCartButton).click();
      cy.get(cartPage.cartIcon).click();
    });
    it('CartPage: Then user navigates to Cart Page', () => {
      cy.url().should('eq', urls.cartPage);
    });
    it('CartPage: Then Cart should contain one item', () => {
      cy.get(inventoryPage.inventoryItem).should('have.length', 1);
    });
    it('CartPage: The added item should have the correct name', () => {
      cy.get(inventoryPage.inventoryItem).first().find(inventoryPage.inventoryItemName).should('have.text', cartPageTestData.tshirt.name);
    });
    it('CartPage: The added item should have the correct description', () => {
      cy.get(inventoryPage.inventoryItem).first().find(inventoryPage.inventoryItemDesc).should('have.text', cartPageTestData.tshirt.description);
    });
    it('CartPage: The added item should have the correct price', () => {
      cy.get(inventoryPage.inventoryItem).first().find(inventoryPage.inventoryItemPrice).should('have.text', cartPageTestData.tshirt.price);
    });
    it('CartPage: Then Remove button should be visible for the item', () => {
      cy.get(inventoryPage.inventoryItem).first().find(inventoryPage.removeButton).should('be.visible').and('have.text', l10n.inventoryPage.remove);
    });
  });

  context('CartPage: When user press the Continue Shopping button on the Cart page', () => {
    before(() => {
      cy.get(cartPage.continueShoppingButton).click();
    });
    it('CartPage: URL should include /inventory.html', () => {
      cy.url().should('include', '/inventory.html');
    });
    it('CartPage: Inventory container should be visible', () => {
      cy.get(inventoryPage.inventoryContainer).should('be.visible');
    });
  });

  context('CartPage: When user press the Checkout Shopping button the Cart page', () => {
    before(() => {
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
    });
    it('CartPage: Checkout button should navigate to Checkout Your Information page URL', () => {
      cy.url().should('include', '/checkout-step-one.html');
    });
    it('CartPage: Checkout page should display the correct title', () => {
      cy.get(checkOutInfoPage.checkOutInfoTitle).should('have.text', l10n.checkOutInfoPage.checkOutInfoTitle);
    });
    after(() => {
      cy.get(menu.menuButton).click();
      cy.get(menu.allItems).click();
      cy.get(cartPage.cartIcon).click();
    });
  });

  context('CartPage: When user removes items from the shopping cart', () => {
    before(() => {
      cy.contains(inventoryPage.inventoryItemName, cartPageTestData.tshirt.name).parents(inventoryPage.inventoryItem).find(inventoryPage.removeButton).click();
    });
    it('CartPage: Then Cart should not contain any items', () => {
      cy.get(inventoryPage.inventoryItem).should('not.exist');
    });
    it('CartPage: Then removed item name should no longer be visible', () => {
      cy.get(inventoryPage.inventoryItemName).should('not.exist');
    });
    it('CartPage: Then removed item description should no longer be visible', () => {
      cy.get(inventoryPage.inventoryItemDesc).should('not.exist');
    });
    it('CartPage: Then removed item price should no longer be visible', () => {
      cy.get(inventoryPage.inventoryItemPrice).should('not.exist');
    });
    after(() => {
      cy.get(menu.menuButton).click();
      cy.get(menu.allItems).click();
    });
  });

  context('CartPage: When user adds two items to the shopping cart', () => {
    before(() => {
      cy.contains(inventoryPage.inventoryItemName, cartPageTestData.jacket.name).parents(inventoryPage.inventoryItem).find(inventoryPage.addToCartButton).click();
      cy.contains(inventoryPage.inventoryItemName, cartPageTestData.onesie.name).parents(inventoryPage.inventoryItem).find(inventoryPage.addToCartButton).click();
      cy.get(cartPage.cartIcon).click();
    });
    it('CartPage: Then Cart should contain two items', () => {
      cy.get(inventoryPage.inventoryItem).should('have.length', 2);
    });
    it('CartPage: Then the first product details should match the added product', () => {
      cy.get(inventoryPage.inventoryItem)
        .eq(0)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('have.text', cartPageTestData.jacket.name);
          cy.get(inventoryPage.inventoryItemDesc).should('have.text', cartPageTestData.jacket.description);
          cy.get(inventoryPage.inventoryItemPrice).should('have.text', cartPageTestData.jacket.price);
        });
    });
    it('CartPage: Then the second product details should match the added product', () => {
      cy.get(inventoryPage.inventoryItem)
        .eq(1)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('have.text', cartPageTestData.onesie.name);
          cy.get(inventoryPage.inventoryItemDesc).should('have.text', cartPageTestData.onesie.description);
          cy.get(inventoryPage.inventoryItemPrice).should('have.text', cartPageTestData.onesie.price);
        });
    });
  });
});
