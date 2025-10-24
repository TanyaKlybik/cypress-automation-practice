import { productNames } from '../../test-data/products.test-data';
const firstProduct = productNames.backpack;
const secondProduct = productNames.bike;
const thirdProduct = productNames.tshirt;

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
      cy.get(cartPage.cartTitle).should('contain.text', l10n.cartPage.cartTitle);
    });
    it('CartPage: Then Cart icon should display', () => {
      cy.get(cartPage.cartIcon).should('be.visible');
    });
    it('CartPage:Then QTY column header should display', () => {
      cy.contains(l10n.cartPage.qty).should('be.visible');
    });
    it('CartPage: Then Description column header  should display', () => {
      cy.contains(l10n.cartPage.description).should('be.visible');
    });
    it('CartPage: Then Continue Shopping button should display', () => {
      cy.get(cartPage.continueShoppingButton).should('be.visible').and('contain.text', l10n.cartPage.continueShopping);
    });
    it('CartPage: Then Checkout button should display', () => {
      cy.get(cartPage.checkoutButton).should('be.visible').and('contain.text', l10n.cartPage.checkout);
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
      cy.contains(inventoryPage.inventoryItemName, thirdProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).click();
        });
    });
    it('CartPage: Then user navigates to Cart Page', () => {
      cy.get(cartPage.cartIcon).click();
      cy.url().should('eq', urls.cartPage);
    });
    it('CartPage: Then Cart should contain one item', () => {
      cy.get(inventoryPage.inventoryItem).should('have.length', 1);
    });
    it('CartPage: Then the added item should match the added product', () => {
      cy.get(inventoryPage.inventoryItem)
        .first()
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('contain.text', thirdProduct.name);
          cy.get(inventoryPage.inventoryItemDesc).should('contain.text', thirdProduct.description);
          cy.get(inventoryPage.inventoryItemPrice).should('contain.text', thirdProduct.price);
        });
    });
    it('CartPage: Then Remove button should be visible for the item', () => {
      cy.get(inventoryPage.inventoryItem)
        .first()
        .within(() => {
          cy.get(inventoryPage.removeButton).should('be.visible').and('contain.text', l10n.inventoryPage.remove);
        });
    });
  });

  context('CartPage: When user press the Continue Shopping button on the Cart page', () => {
    before(() => {
      cy.get(cartPage.continueShoppingButton).click();
    });
    it('CartPage: Then Continue Shopping button should navigate back to Inventory Page', () => {
      cy.url().should('include', '/inventory.html');
      cy.get(inventoryPage.inventoryContainer).should('be.visible');
    });
  });

  context('CartPage: When user press the Checkout Shopping button the Cart page', () => {
    before(() => {
      cy.get(cartPage.cartIcon).click();
      cy.get(cartPage.checkoutButton).click();
    });
    it('CartPage: Then Checkout button should navigate to Checkout Your information page', () => {
      cy.url().should('include', '/checkout-step-one.html');
      cy.get(checkOutInfoPage.checkOutInfoTitle).should('contain.text', l10n.checkOutInfoPage.checkOutInfoTitle);
    });
    after(() => {
      cy.get(menu.menuButton).click();
      cy.get(menu.allItems).click();
      cy.get(cartPage.cartIcon).click();
    });
  });

  context('CartPage: When user removes items from the shopping cart', () => {
    before(() => {
      cy.contains(inventoryPage.inventoryItemName, thirdProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.removeButton).click();
        });
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
      cy.contains(inventoryPage.inventoryItemName, firstProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).click();
        });
      cy.contains(inventoryPage.inventoryItemName, secondProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).click();
        });
      cy.get(cartPage.cartIcon).click();
    });
    it('CartPage: Then Cart should contain two items', () => {
      cy.get(inventoryPage.inventoryItem).should('have.length', 2);
    });
    it('CartPage: Then Backpack details should match the added product', () => {
      cy.get(inventoryPage.inventoryItem)
        .eq(0)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('contain.text', firstProduct.name);
          //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/12
          //cy.get(inventoryPage.inventoryItemDesc).should('contain.text', firstProduct.description);
          cy.get(inventoryPage.inventoryItemPrice).should('contain.text', firstProduct.price);
        });
    });
    it('CartPage: Then Bike details should match the added product', () => {
      cy.get(inventoryPage.inventoryItem)
        .eq(1)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('contain.text', secondProduct.name);
          cy.get(inventoryPage.inventoryItemDesc).should('contain.text', secondProduct.description);
          cy.get(inventoryPage.inventoryItemPrice).should('contain.text', secondProduct.price);
        });
    });
  });
});
