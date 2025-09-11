describe('CheckoutInfoPage: Given the "Checkout: Your information" page is open after adding 1 product to the Cart ', { testIsolation: false }, () => {
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
            });
        });
    });

    context('CheckoutInfoPage: When user is on the "Checkout: Your information" page', () => {
        it('CheckoutInfoPage: Then page title "Checkout: Your Information" should be visible', () => {
            cy.get(checkOutInfoPage.checkOutInfoTitle).should('have.text', l10n.checkOutInfoPage.checkOutInfoTitle);
        });
        it('CheckoutInfoPage: Then First Name input field should be visible', () => {
            cy.get(checkOutInfoPage.firstNameInput).should('be.visible');
        });
        it('CheckoutInfoPage: Then First Name input field should have placeholder "First Name"', () => {
            cy.get(checkOutInfoPage.firstNameInput).should('have.attr', 'placeholder', l10n.checkOutInfoPage.firstNamePlaceholder);
        });
        it('CheckoutInfoPage: Then Last Name input field should be visible', () => {
            cy.get(checkOutInfoPage.lastNameInput).should('be.visible');
        });
        it('CheckoutInfoPage: Then Last Name input field should have placeholder "Last Name"', () => {
            cy.get(checkOutInfoPage.lastNameInput).should('have.attr', 'placeholder', l10n.checkOutInfoPage.lastNamePlaceholder);
        });
        it('CheckoutInfoPage: Then Postal Code input field should be visible', () => {
            cy.get(checkOutInfoPage.postalCodeInput).should('be.visible');
        });
        it('CheckoutInfoPage: Then Postal Code input field should have placeholder "Zip/Postal Code"', () => {
            cy.get(checkOutInfoPage.postalCodeInput).should('have.attr', 'placeholder', l10n.checkOutInfoPage.postalCodePlaceholder);
        });
        it('CheckoutInfoPage: Then "Cancel" button should be visible', () => {
            cy.get(checkOutInfoPage.cancelButton).should('be.visible');
        });
        it('CheckoutInfoPage: Then "Continue" button should be visible', () => {
            cy.get(checkOutInfoPage.continueButton).should('be.visible');
        });
        it('CartPage: Then Cart badge should display correct number', () => {
            cy.get(cartPage.cartBadge).should('contain', '1');
        });
    });

    context('CheckoutInfoPage: When user leaves First Name empty and clicks "Continue"', () => {
        it('CheckoutInfoPage: Then error message "First Name is required" should be displayed', () => {
            cy.get(checkOutInfoPage.lastNameInput).type('Doe1234567890');
            cy.get(checkOutInfoPage.postalCodeInput).type('AB-1234567889');
            cy.get(checkOutInfoPage.continueButton).click();
            cy.get(checkOutInfoPage.errorMessage).should('contain.text', l10n.errors.firstNameIsRequired);
        });
    });

    context('CheckoutInfoPage: When user leaves Last Name empty and clicks "Continue"', () => {
        it('CheckoutInfoPage: Then error message "Last Name is required" should be displayed', () => {
            cy.get(checkOutInfoPage.firstNameInput).clear().type('John123456789');
            cy.get(checkOutInfoPage.lastNameInput).clear();
            cy.get(checkOutInfoPage.continueButton).click();
            cy.get(checkOutInfoPage.errorMessage).should('contain.text', l10n.errors.lastNameIsRequired);
        });
    });

    context('CheckoutInfoPage: When user leaves Postal Code empty and clicks "Continue"', () => {
        it('CheckoutInfoPage: Then error message "Postal Code is required" should be displayed', () => {
            cy.get(checkOutInfoPage.postalCodeInput).clear();
            cy.get(checkOutInfoPage.lastNameInput).clear().type('Doe123456789');
            cy.get(checkOutInfoPage.continueButton).click();
            cy.get(checkOutInfoPage.errorMessage).should('contain.text', l10n.errors.postalCodeIsRequired);
        });
    });

    context('CheckoutInfoPage: When user clicks the "Cancel" button', () => {
        it('CheckoutInfoPage: Then user should be navigated back to the Cart page', () => {
            cy.get(checkOutInfoPage.cancelButton).click();
            cy.url().should('eq', urls.cartPage);
            cy.get(cartPage.cartTitle).should('have.text', l10n.cartPage.cartTitle);
        });
    });

    context('CheckoutInfoPage: When user fills in all required fields and clicks "Continue"', () => {
        before(() => {
            cy.get(cartPage.checkoutButton).click();
        });
        it('CheckoutInfoPage: Then user should be navigated to the Overview page', () => {
            cy.checkoutInfo_FillFormAndContinue('John', 'Doe', '12345');
        });
        after(() => {
            cy.get(cartPage.cartIcon).click();
            cy.get(inventoryPage.removeButton).first().click();
        });
    });
});