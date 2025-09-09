describe('CartPage: Given cart page is open ', { testIsolation: false }, () => {
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
                cy.get(cartPage.cartIcon).click();
            });
        });
    });

    context('CartPage:  When the cart is freshly opened after Reset App State', () => {
        it('CartPage: Then it should display correct page title', () => {
            cy.get(cartPage.cartTitle).should('contain.text', l10n.cartPage.cartTitle);
        });
        it('CartPage: Then it should display cart icon', () => {
            cy.get(cartPage.cartIcon).should('be.visible');
        });
        it('CartPage: Then it should display column headers QTY and Description', () => {
            cy.contains(l10n.cartPage.qty).should('be.visible');
            cy.contains(l10n.cartPage.description).should('be.visible');
        });
        it('CartPage: Then it should display "Continue Shopping" button', () => {
            cy.get(cartPage.continueShoppingButton).should('be.visible');
        });
        it('CartPage: Then it should display "Checkout" button', () => {
            cy.get(cartPage.checkoutButton).should('be.visible');
        });
        it.skip('CartPage: Then it should not allow checkout when cart is empty', () => {
            //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/13
            cy.get(cartPage.checkoutButton).click();
            cy.url().should('eq', urls.cartPage);
        });
        it('CartPage: Then it should not display cart badge when cart is empty after Reset App State', () => {
            cy.get(cartPage.cartBadge).should('not.exist');
        });
        it('CartPage: Then it should not display any cart items', () => {
            cy.get(inventoryPage.inventoryItem).should('not.exist');
        });
    });

    context('CartPage: When user adds items to the shopping cart', () => {
        let firstItem;

        before(() => {
            cy.get(menu.menuButton).click();
            cy.then(() => {
                cy.get(menu.allItems).click();
                cy.get(inventoryPage.inventoryItem).first().then(($item) => {
                firstItem = {
                    name: $item.find(inventoryPage.inventoryItemName).text(),
                    desc: $item.find(inventoryPage.inventoryItemDesc).text(),
                    price: $item.find(inventoryPage.inventoryItemPrice).text(),
                };
                cy.get(inventoryPage.addToCartButton).first().click();
                cy.get(cartPage.cartIcon).click();
                });
            });
        });

        it('CartPage: Then Cart badge should display correct number', () => {
            cy.get(cartPage.cartBadge).should('contain', '1');
        });
        it('CartPage: Then cart should contain one item', () => {
            cy.get(inventoryPage.inventoryItem).should('have.length', 1);
        });
        it('CartPage: Then item name should match the added product', () => {
            cy.get(inventoryPage.inventoryItemName).should('have.text', firstItem.name);
        });
        it('CartPage: Then item description should match the added product', () => {
            cy.get(inventoryPage.inventoryItemDesc).should('have.text', firstItem.desc);
        });
        it('CartPage: Then item price should match the added product', () => {
            cy.get(inventoryPage.inventoryItemPrice).should('have.text', firstItem.price);
        });
        it('CartPage: Then Remove button should be visible for the item', () => {
            cy.get(inventoryPage.inventoryItem)
                .first()
                .within(() => {
                    cy.get(inventoryPage.removeButton).should('be.visible');
                });
        });
    });

    context('CartPage: When user removes items from the shopping cart', () => {
        before(() => {
            cy.get(inventoryPage.removeButton).first().click();
        });
        it('CartPage: Then cart badge should not exist', () => {
            cy.get(cartPage.cartBadge).should('not.exist');
        });
        it('CartPage: Then cart should not contain any items', () => {
            cy.get(inventoryPage.inventoryItem).should('not.exist');
        });
        it('CartPage: Then removed item details should no longer be visible', () => {
            cy.get(inventoryPage.inventoryItemName).should('not.exist');
            cy.get(inventoryPage.inventoryItemDesc).should('not.exist');
            cy.get(inventoryPage.inventoryItemPrice).should('not.exist');
        });
    });

    context('CartPage: When user press the "Continue Shopping" button on the Cart page', () => {
        before(() => {
            cy.get(menu.menuButton).click();
            cy.then(() => {
                cy.get(menu.allItems).click();
                // cy.get(menu.closeButton).click();
                cy.url().should('eq', urls.inventoryPage);
                cy.get(inventoryPage.addToCartButton).first().click();
                cy.get(cartPage.cartIcon).click();
            });
        });
        it('CartPage: Then "Continue Shopping" button should navigate back to Inventory Page', () => {
            cy.get(cartPage.continueShoppingButton).click();
            cy.url().should('include', '/inventory.html');
            cy.get(inventoryPage.inventoryContainer).should('be.visible');
        });
    });

    context('CartPage: When user press the Checkout Shopping button the Cart page', () => {
        before(() => {
                cy.get(cartPage.cartIcon).click();
            });
        it('CartPage: Then Checkout button should navigate to "Checkout: Your information" page', () => {
            cy.get(cartPage.checkoutButton).click();
            cy.url().should('include', '/checkout-step-one.html');
            cy.get(checkOutInfoPage.checkOutInfoTitle).should('contain.text', l10n.checkOutInfoPage.checkOutInfoTitle);
        });
    });

    context('CartPage: When user adds two items to the shopping cart', () => {
        let secondItem;

        before(() => {
            cy.get(checkOutInfoPage.cancelButton).click();
            cy.then(() => {
                cy.get(cartPage.continueShoppingButton).click();
                cy.then(() => {
                    cy.get(inventoryPage.inventoryItem).eq(1).then(($item) => {
                        secondItem = {
                            name: $item.find(inventoryPage.inventoryItemName).text(),
                            desc: $item.find(inventoryPage.inventoryItemDesc).text(),
                            price: $item.find(inventoryPage.inventoryItemPrice).text(),
                        };
                        cy.wrap($item).find(inventoryPage.addToCartButton).click();
                        cy.get(cartPage.cartIcon).click();
                    });
                });
            });
        });

        it('CartPage: Then Cart badge should display correct number', () => {
            cy.get(cartPage.cartBadge).should('contain', '2');
        });
        it('CartPage: Then Cart should contain two items', () => {
            cy.get(inventoryPage.inventoryItem).should('have.length', 2);
        });
        it('CartPage: Then second item details should match the added product', () => {
            cy.get(inventoryPage.inventoryItem).eq(1).within(() => {
                cy.get(inventoryPage.inventoryItemName).should('have.text', secondItem.name);
                cy.get(inventoryPage.inventoryItemDesc).should('have.text', secondItem.desc);
                cy.get(inventoryPage.inventoryItemPrice).should('have.text', secondItem.price);
            });
        });
    });
});




