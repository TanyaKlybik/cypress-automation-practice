import { productNames } from '../../test-data/products.test-data';
const firstProduct = productNames.backpack;
const secondProduct = productNames.bike;
const thirdProduct = productNames.tshirt;

describe('InventoryPage: Footer section', { testIsolation: false }, () => {
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

  context('When the inventory page is loaded', () => {
    it('Then exactly 6 products should be displayed', () => {
      cy.get(inventoryPage.inventoryItem).should('have.length', 6);
    });
    it('Then each product should have a name', () => {
      cy.get(inventoryPage.inventoryItem).each(($el) => {
        cy.wrap($el).find(inventoryPage.inventoryItemName).should('be.visible').and('not.be.empty');
      });
    });
    it('Then each product should have a description', () => {
      cy.get(inventoryPage.inventoryItem).each(($el) => {
        cy.wrap($el).find(inventoryPage.inventoryItemDesc).should('be.visible').and('not.be.empty');
      });
    });
    it('Then each product should have a price', () => {
      cy.get(inventoryPage.inventoryItem).each(($el) => {
        cy.wrap($el)
          .find(inventoryPage.inventoryItemPrice)
          .should('be.visible')
          .invoke('text')
          .should('match', /\$\d+\.\d{2}/);
      });
    });
    it('Then each product should have an image', () => {
      cy.get(inventoryPage.inventoryItem).each(($el) => {
        cy.wrap($el)
          .find('img')
          .should('be.visible')
          .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
          });
      });
    });
    it('Then each product should have an "Add to cart" button', () => {
      cy.get(inventoryPage.inventoryItem).each(($el) => {
        cy.wrap($el).find(inventoryPage.addToCartButton).should('be.visible').and('contain.text', l10n.inventoryPage.addToCart);
      });
    });
    it('Then all products should be sorted by default', () => {
      cy.get(inventoryPage.inventoryItem)
        .find(inventoryPage.inventoryItemName)
        .then(($els) => {
          const names = Cypress._.map($els, 'innerText');
          const sorted = [...names].sort((a, b) => a.localeCompare(b));
          expect(names).to.deep.equal(sorted);
        });
    });
  });

  context('When the user opens the filter dropdown', () => {
    it('Then the filter should display option "Name (A to Z)"', () => {
      cy.get(inventoryPage.sortDropdown).find('option').contains('Name (A to Z)').should('exist');
    });
    it('Then the filter should display option "Name (Z to A)"', () => {
      cy.get(inventoryPage.sortDropdown).find('option').contains('Name (Z to A)').should('exist');
    });
    it('Then the filter should display option "Price (low to high)"', () => {
      cy.get(inventoryPage.sortDropdown).find('option').contains('Price (low to high)').should('exist');
    });
    it('Then the filter should display option "Price (high to low)"', () => {
      cy.get(inventoryPage.sortDropdown).find('option').contains('Price (high to low)').should('exist');
    });
  });

  context('When the user selects "Name (Z to A)" in the filter', () => {
    before(() => {
      cy.get(inventoryPage.sortDropdown).select('Name (Z to A)');
    });
    it('Then products should be sorted by name in descending order', () => {
      cy.get(inventoryPage.inventoryItem)
        .find(inventoryPage.inventoryItemName)
        .then(($names) => {
          const names = Cypress._.map($names, 'innerText');
          const sorted = [...names].sort((a, b) => b.localeCompare(a));
          expect(names).to.deep.equal(sorted);
        });
    });
    it('Then "Name (Z to A)" should be displayed as the selected option in the filter', () => {
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('contain.text', 'Name (Z to A)');
    });
  });

  context('When the user selects "Price (low to high)" in the filter', () => {
    before(() => {
      cy.get(inventoryPage.sortDropdown).select('Price (low to high)');
    });
    it('Then products should be sorted by price in ascending order', () => {
      cy.get(inventoryPage.inventoryItem)
        .find(inventoryPage.inventoryItemPrice)
        .then(($prices) => {
          const prices = Cypress._.map($prices, (el) => parseFloat(el.innerText.replace('$', '')));
          const sorted = [...prices].sort((a, b) => a - b);
          expect(prices).to.deep.equal(sorted);
        });
    });
    it('Then "Price (low to high)" should be displayed as the selected option in the filter', () => {
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('contain.text', 'Price (low to high)');
    });
  });

  context('When the user selects "Price (high to low)" in the filter', () => {
    before(() => {
      cy.get(inventoryPage.sortDropdown).select('Price (high to low)');
    });
    it('Then products should be sorted by price in descending order', () => {
      cy.get(inventoryPage.inventoryItem)
        .find(inventoryPage.inventoryItemPrice)
        .then(($prices) => {
          const prices = Cypress._.map($prices, (el) => parseFloat(el.innerText.replace('$', '')));
          const sorted = [...prices].sort((a, b) => b - a);
          expect(prices).to.deep.equal(sorted);
        });
    });
    it('Then "Price (high to low)" should be displayed as the selected option in the filter', () => {
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('contain.text', 'Price (high to low)');
    });
  });

  context('When the user selects "Name (A to Z)" in the filter', () => {
    before(() => {
      cy.get(inventoryPage.sortDropdown).select('Name (A to Z)');
    });
    it('Then products should be sorted by name in ascending order', () => {
      cy.get(inventoryPage.inventoryItem)
        .find(inventoryPage.inventoryItemName)
        .then(($names) => {
          const names = Cypress._.map($names, 'innerText');
          const sorted = [...names].sort((a, b) => a.localeCompare(b));
          expect(names).to.deep.equal(sorted);
        });
    });
    it('Then "Name (A to Z)" should be displayed as the selected option in the filter', () => {
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('contain.text', 'Name (A to Z)');
    });
  });

  context('When a test product is added to the cart', () => {
    before(() => {
      cy.get(inventoryPage.inventoryItem).contains(firstProduct.name).parents(inventoryPage.inventoryItem).find(inventoryPage.addToCartButton).click();
    });
    it('Then the cart icon counter should display "1"', () => {
      cy.get(cartPage.cartBadge).should('be.visible').invoke('text').should('eq', '1');
    });
    it('Then the button should change from "Add to cart" to "Remove"', () => {
      cy.get(inventoryPage.inventoryItem).contains(firstProduct.name).parents(inventoryPage.inventoryItem).find(inventoryPage.removeButton).should('be.visible').and('contain.text', 'Remove');
    });
    it('Then all other products still have the "Add to cart" button', () => {
      cy.get(inventoryPage.inventoryItem).each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
            if (!text.includes(firstProduct.name)) {
              cy.wrap($el).find(inventoryPage.addToCartButton).should('be.visible').and('contain.text', 'Add to cart');
            }
          });
      });
    });
  });

  context('When the user clicks the "Add to cart" button for 2 products', () => {
    before(() => {
      cy.get(inventoryPage.inventoryItem).contains(secondProduct.name).closest(inventoryPage.inventoryItem).find(inventoryPage.addToCartButton).click();
    });
    it('Then the cart icon counter should increase by 2', () => {
      cy.get(cartPage.cartBadge).should('be.visible').invoke('text').should('eq', '2');
    });
    it('Then the second product button should change from "Add to cart" to "Remove"', () => {
      cy.get(inventoryPage.inventoryItem).contains(secondProduct.name).closest(inventoryPage.inventoryItem).find(inventoryPage.removeButton).should('be.visible').and('contain.text', 'Remove');
    });
  });

  context('When the user removes products from the cart', () => {
    let initialCartCount;
    before(() => {
      cy.get(cartPage.cartBadge).then(($badge) => {
        initialCartCount = $badge.length ? parseInt($badge.text(), 10) : 0;
      });
    });
    it('Then removing the first product decreases the cart counter by 1', () => {
      cy.get(inventoryPage.inventoryItem).contains(firstProduct.name).closest(inventoryPage.inventoryItem).find(inventoryPage.removeButton).click();
      if (initialCartCount - 1 > 0) {
        cy.get(cartPage.cartBadge)
          .should('be.visible')
          .invoke('text')
          .should('eq', String(initialCartCount - 1));
      } else {
        cy.get(cartPage.cartBadge).should('not.exist');
      }
    });
    it('Then removing the second product removes the cart badge', () => {
      cy.get(inventoryPage.inventoryItem).contains(secondProduct.name).closest(inventoryPage.inventoryItem).find(inventoryPage.removeButton).click();
    });
    it('Then the cart badge should no longer exist', () => {
      cy.get(cartPage.cartBadge).should('not.exist');
    });
  });

  context('When the user clicks on the product name', () => {
    before(() => {
      cy.get(inventoryPage.inventoryItem).contains(firstProduct.name).closest(inventoryPage.inventoryItem).find(inventoryPage.inventoryItemName).click();
    });
    it('Then the user should be redirected to the product details page', () => {
      cy.url().should('include', '/inventory-item.html');
    });
    it('Then the product details page should display the product image', () => {
      cy.get(productPage.productImage).should('be.visible');
    });
    it('Then the product details page should display the product name', () => {
      cy.get(productPage.productName).should('be.visible').and('contain.text', firstProduct.name);
    });
    it.skip('Then the product details page should display the product description', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/12
      cy.get(productPage.productDesc).should('be.visible').and('contain.text', firstProduct.description);
    });
    it('Then the product details page should display the product price', () => {
      cy.get(productPage.productPrice).should('be.visible').and('contain.text', firstProduct.price);
    });
    it('Then the product details page should display the "Add to cart" button', () => {
      cy.get(inventoryPage.addToCartButton).should('be.visible').and('contain.text', 'Add to cart');
    });
  });

  context('When the user clicks the browser "Back" button on the product details page', () => {
    before(() => {
      cy.go('back');
    });
    it('Then the user should be redirected back to the Inventory Page', () => {
      cy.url().should('include', '/inventory.html');
      cy.get(inventoryPage.inventoryTitle).should('be.visible');
      cy.get(inventoryPage.inventoryContainer).should('be.visible');
    });
  });

  context('When the user adds a product to the cart from the Inventory Page, opens the product details page via the title, and clicks on the cart icon', () => {
    before(() => {
      cy.contains(inventoryPage.inventoryItemName, thirdProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).click();
          cy.get(inventoryPage.addToCartButton).click();
        });
    });
    it('Then the user should be redirected to the Cart Page', () => {
      cy.get(cartPage.cartIcon).click();
      cy.url().should('eq', urls.cartPage);
      cy.get(cartPage.cartTitle).should('be.visible').and('contain.text', l10n.cartPage.cartTitle);
    });
    it('Then the cart should display the added product', () => {
      cy.get(inventoryPage.inventoryItem).should('have.length', 1);
      cy.get(inventoryPage.inventoryItem)
        .first()
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('contain.text', thirdProduct.name);
        });
    });
    it('Then the product details in the cart should match those from the product page', () => {
      cy.get(inventoryPage.inventoryItem)
        .first()
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('contain.text', thirdProduct.name);
          cy.get(inventoryPage.inventoryItemDesc).should('contain.text', thirdProduct.description);
          cy.get(inventoryPage.inventoryItemPrice).should('contain.text', thirdProduct.price);
        });
    });
  });

  context('When the user returns to Inventory Page via "Continue Shopping" and adds another product', () => {
    before(() => {
      cy.get(cartPage.continueShoppingButton).click();
      cy.contains(inventoryPage.inventoryItemName, secondProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).should('be.visible').click();
        });
    });
    it('Then the cart icon counter should display 2 products', () => {
      cy.get(cartPage.cartBadge).should('contain.text', '2');
    });
    it('Then both products should be displayed in the cart', () => {
      cy.get(cartPage.cartIcon).click();
      cy.get(inventoryPage.inventoryItem).should('have.length', 2);
      cy.get(inventoryPage.inventoryItem)
        .contains(inventoryPage.inventoryItemName, secondProduct.name)
        .parents(inventoryPage.inventoryItem)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('contain.text', secondProduct.name);
          cy.get(inventoryPage.inventoryItemDesc).should('contain.text', secondProduct.description);
          cy.get(inventoryPage.inventoryItemPrice).should('contain.text', secondProduct.price);
        });
    });
  });
});
