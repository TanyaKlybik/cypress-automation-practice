describe('InventoryPage: Footer section', { testIsolation: false }, () => {
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
      cy.shouldBeSorted(inventoryPage.inventoryItem, inventoryPage.inventoryItemName);
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
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('have.text', 'Name (Z to A)');
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
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('have.text', 'Price (low to high)');
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
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('have.text', 'Price (high to low)');
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
      cy.get(inventoryPage.sortDropdown).find('option:selected').should('have.text', 'Name (A to Z)');
    });
  });

  context.skip('When checking product content for end-user friendliness', () => {
    //   TODO:https://github.com/TanyaKlybik/cypress-automation-practice/issues/12
    before(() => {
      cy.get(menu.closeButton).click();
    });
    it.skip('Then product names should not contain technical or placeholder text', () => {
      const disallowedNamePatterns = [/test/i, /\(\)/, /allthethings/i, /assert/i, /debug/i, /[{}]/, /[<>]/];

      cy.get(inventoryPage.inventoryItemName).each(($el) => {
        const name = $el.text();
        disallowedNamePatterns.forEach((pattern) => {
          expect(name).not.to.match(pattern, `Disallowed pattern "${pattern}" found in product name: "${name}"`);
        });
      });
    });

    it.skip('Then product descriptions should not contain technical or placeholder text', () => {
      const disallowedDescriptionPatterns = [/test/i, /debug/i, /assert/i, /lorem ipsum/i, /allthethings/i, /\(\)/];

      cy.get(inventoryPage.inventoryItemDesc).each(($el) => {
        const description = $el.text();
        disallowedDescriptionPatterns.forEach((pattern) => {
          expect(description).not.to.match(pattern, `Disallowed pattern "${pattern}" found in product description: "${description}"`);
        });
      });
    });
  });

  context('When the first product is added to the cart', () => {
    before(() => {
      cy.get(inventoryPage.inventoryItem).first().find(inventoryPage.addToCartButton).click();
    });
    it('Then the cart icon counter should display "1"', () => {
      cy.get(cartPage.cartBadge).should('be.visible').invoke('text').should('eq', '1');
    });
    it('Then the button should change from "Add to cart" to "Remove"', () => {
      cy.get(inventoryPage.inventoryItem).first().find(inventoryPage.removeButton).should('be.visible').and('contain.text', 'Remove');
    });
    it('Then all other products still have the "Add to cart" button', () => {
      cy.get(inventoryPage.inventoryItem).each(($el, index) => {
        if (index !== 0) {
          // Пропускаем первый товар — он уже добавлен
          cy.wrap($el).find(inventoryPage.addToCartButton).should('be.visible').and('contain.text', 'Add to cart');
        }
      });
    });
  });

  context('When the user clicks the "Add to cart" button for 1 more product', () => {
    let initialCartCount = 0;
    before(() => {
      cy.get('body').then(($body) => {
        if ($body.find(cartPage.cartBadge).length) {
          cy.get(cartPage.cartBadge)
            .invoke('text')
            .then((text) => {
              initialCartCount = parseInt(text, 10);
            });
        } else {
          initialCartCount = 0;
        }
      });
      cy.get(inventoryPage.inventoryItem).eq(1).find(inventoryPage.addToCartButton).click();
    });
    it('Then the cart icon counter should increase by 1', () => {
      cy.get(cartPage.cartBadge)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          const newCount = parseInt(text, 10);
          expect(newCount).to.equal(initialCartCount + 1);
        });
    });
    it('Then the button should change from "Add to cart" to "Remove"', () => {
      cy.get(inventoryPage.inventoryItem).eq(1).find(inventoryPage.removeButton).should('be.visible').and('contain.text', l10n.inventoryPage.remove);
    });
  });

  context('When the user clicks the "Remove" button for a product', () => {
    let initialCartCount = 0;
    before(() => {
      cy.getCartCount().then((count) => {
        initialCartCount = count;
      });
    });
    it('Then the cart icon counter should decrease by 1 each time a product is removed', () => {
      for (let i = initialCartCount - 1; i >= 0; i--) {
        cy.get(inventoryPage.inventoryItem)
          .filter((index, el) => {
            return Cypress.$(el).find(inventoryPage.removeButton).length > 0;
          })
          .first()
          .find(inventoryPage.removeButton)
          .click();
        if (i > 0) {
          cy.get(cartPage.cartBadge).should('be.visible').invoke('text').should('eq', String(i));
        } else {
          cy.get(cartPage.cartBadge).should('not.exist');
        }
      }
    });
  });

  context('When the user clicks on the product name', () => {
    let productName, productDesc, productPrice;
    before(() => {
      cy.get(inventoryPage.inventoryItem)
        .first()
        .within(() => {
          cy.get(inventoryPage.inventoryItemName)
            .invoke('text')
            .then((text) => {
              productName = text;
            });
          cy.get(inventoryPage.inventoryItemDesc)
            .invoke('text')
            .then((text) => {
              productDesc = text;
            });
          cy.get(inventoryPage.inventoryItemPrice)
            .invoke('text')
            .then((text) => {
              productPrice = text;
            });
          cy.get(inventoryPage.inventoryItemName).click();
        });
    });
    it('Then the user should be redirected to the product details page', () => {
      cy.url().should('include', '/inventory-item.html');
    });
    it('Then the product details page should display the product image', () => {
      cy.get(productPage.productImage).should('be.visible');
    });
    it('Then the product details page should display the product name', () => {
      cy.get(productPage.productName).should('be.visible').and('have.text', productName);
    });
    it('Then the product details page should display the product description', () => {
      cy.get(productPage.productDesc).should('be.visible').and('have.text', productDesc);
    });
    it('Then the product details page should display the product price', () => {
      cy.get(productPage.productPrice).should('be.visible').and('have.text', productPrice);
    });
    it('Then the product details page should display the "Add to cart" button', () => {
      cy.get(inventoryPage.addToCartButton).should('be.visible').and('contain.text', 'Add to cart');
    });
  });

  context('When the user clicks the "Add to cart" button on the product details page', () => {
    let initialCartCount = 0;
    before(() => {
      cy.getCartCount().then((count) => {
        initialCartCount = count;
      });
    });
    it('Then the cart icon counter should increase by 1', () => {
      cy.get(inventoryPage.addToCartButton).click();
      cy.get(cartPage.cartBadge)
        .should('be.visible')
        .invoke('text')
        .should('eq', String(initialCartCount + 1));
    });

    it('Then the button should change from "Add to cart" to "Remove"', () => {
      cy.get(inventoryPage.removeButton).should('be.visible').and('contain.text', 'Remove');
    });
  });

  context('When the user clicks the "Remove" button on the product details page', () => {
    let initialCartCount = 0;
    before(() => {
      cy.getCartCount().then((count) => {
        initialCartCount = count;
      });
    });
    it('Then the cart icon counter should decrease by 1', () => {
      cy.get(inventoryPage.removeButton).click();
      if (initialCartCount > 1) {
        cy.getCartCount().then((newCount) => {
          expect(newCount).to.eq(initialCartCount - 1);
        });
      } else {
        cy.get(cartPage.cartBadge).should('not.exist');
      }
    });
    it('Then the button should change from "Remove" back to "Add to cart"', () => {
      cy.get(productPage.productRemoveButton).should('not.exist');
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
    let product = {};
    before(() => {
      cy.get(inventoryPage.inventoryItem)
        .eq(0)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName)
            .invoke('text')
            .then((name) => {
              product.name = name;
            });
          cy.get(inventoryPage.inventoryItemDesc)
            .invoke('text')
            .then((desc) => {
              product.desc = desc;
            });
          cy.get(inventoryPage.inventoryItemPrice)
            .invoke('text')
            .then((price) => {
              product.price = price;
            });
          cy.get(inventoryPage.inventoryItemName).click();
        });
      cy.then(() => {
        cy.get(inventoryPage.addToCartButton).click();
      });
    });
    it('Then the user should be redirected to the Cart Page', () => {
      cy.get(cartPage.cartIcon).click();
      cy.url().should('eq', urls.cartPage);
      cy.get(cartPage.cartTitle).should('be.visible').and('have.text', l10n.cartPage.cartTitle);
    });
    it('Then the cart should display the added product', () => {
      cy.get(inventoryPage.inventoryItem).should('have.length', 1);
      cy.get(inventoryPage.inventoryItem)
        .first()
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('have.text', product.name);
        });
    });
    it('Then the product details in the cart should match those from the product page', () => {
      cy.get(inventoryPage.inventoryItem)
        .first()
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('have.text', product.name);
          cy.get(inventoryPage.inventoryItemDesc).should('have.text', product.desc);
          cy.get(inventoryPage.inventoryItemPrice).should('have.text', product.price);
        });
    });
  });

  context('When the user returns to Inventory Page via "Continue Shopping" and adds another product', () => {
    let secondProduct = {};
    before(() => {
      cy.get(cartPage.continueShoppingButton).click();
      cy.get(inventoryPage.inventoryItem)
        .eq(1)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName)
            .invoke('text')
            .then((name) => {
              secondProduct.name = name;
            });
          cy.get(inventoryPage.inventoryItemDesc)
            .invoke('text')
            .then((desc) => {
              secondProduct.desc = desc;
            });
          cy.get(inventoryPage.inventoryItemPrice)
            .invoke('text')
            .then((price) => {
              secondProduct.price = price;
            });
          cy.get(inventoryPage.addToCartButton).should('be.visible').click();
        });
    });
    it('Then the cart icon counter should display 2 products', () => {
      cy.get(cartPage.cartBadge).should('have.text', '2');
    });
    it('Then both products should be displayed in the cart', () => {
      cy.get(cartPage.cartIcon).click();
      cy.get(inventoryPage.inventoryItem).should('have.length', 2);
      cy.get(inventoryPage.inventoryItemName).then(($items) => {
        const names = [...$items].map((item) => item.innerText);
        expect(names).to.include(secondProduct.name);
      });
      cy.get(inventoryPage.inventoryItem)
        .eq(1)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName).should('have.text', secondProduct.name);
          cy.get(inventoryPage.inventoryItemDesc).should('have.text', secondProduct.desc);
          cy.get(inventoryPage.inventoryItemPrice).should('have.text', secondProduct.price);
        });
    });
    it.skip('Then both products should be displayed in the cart (when the user is on the Cart page)', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/11
    });
  });

  context('When the user selects "Reset App State" from the menu', () => {
    before(() => {
      cy.resetAppState();
    });
    it('Then the cart icon counter should be reset to zero', () => {
      cy.get(cartPage.cartBadge).should('not.exist');
    });
    it('Then all products should be removed from the cart', () => {
      cy.get(cartPage.cartIcon).click();
      cy.get(inventoryPage.inventoryItem).should('not.exist');
    });
  });

  context.skip('When the user adds first product to cart from Inventory, resets app state, and checks UI updates', () => {
    //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/10
    let product = {};

    before(() => {
      cy.get(menu.allItems).click();
      cy.get(inventoryPage.inventoryItem)
        .eq(0)
        .within(() => {
          cy.get(inventoryPage.inventoryItemName)
            .invoke('text')
            .then((name) => {
              product.name = name;
            });
          cy.get(inventoryPage.inventoryItemDesc)
            .invoke('text')
            .then((desc) => {
              product.desc = desc;
            });
          cy.get(inventoryPage.inventoryItemPrice)
            .invoke('text')
            .then((price) => {
              product.price = price;
            });
          cy.get(inventoryPage.addToCartButton).should('be.visible').click();
          cy.get(inventoryPage.removeButton).should('be.visible');
        });
      cy.then(() => {
        cy.resetAppState();
      });
    });
    it.skip('Then the cart icon should NOT display a counter', () => {
      cy.get(cartPage.cartBadge).should('not.exist');
    });
    it.skip('Then the previously added product should have "Add to cart" button again', () => {
      cy.get(menu.menuButton).click();
      cy.get(menu.allItems).click();
      cy.get(inventoryPage.inventoryItem)
        .eq(0)
        .within(() => {
          cy.get(inventoryPage.addToCartButton).should('be.visible');
          cy.get(inventoryPage.removeButton).should('not.exist');
        });
    });
  });
});
