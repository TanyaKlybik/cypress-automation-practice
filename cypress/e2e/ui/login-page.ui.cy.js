describe('LoginPage: Given login page is open', { testIsolation: false }, () => {
  let standardUser, lockedUser ;

  before(() => {
    cy.getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
    });
    cy.getUserDataByRole(userRoles.LOCKED).then((user) => {
      lockedUser = user;
    });
    cy.visit('/');
  });

  context('LoginPage: When login page loads', () => {
      it('LoginPage: Then the page title should be visible', () => {
          cy.contains(l10n.loginPage.title).should('be.visible');
      });
      it('LoginPage: Then the username field should be empty with correct placeholder', () => {
          cy.get(loginPage.usernameInput).should('be.visible').and('have.attr', 'placeholder', l10n.loginPage.username).and('have.value', '');
      });
      it('LoginPage: Then the password field should be empty with correct placeholder', () => {
          cy.get(loginPage.passwordInput).should('be.visible').and('have.attr', 'placeholder', l10n.loginPage.password).and('have.value', '');
      });
      it('LoginPage: Then the login button should be enabled with correct label', () => {
          cy.get(loginPage.loginButton).should('be.visible').and('have.value', l10n.loginPage.login).and('be.enabled');
      });
  });

  context('LoginPage: When user tries to login with invalid data: empty username and password ', () => {
    before(() => {
      cy.get(loginPage.loginButton).click();
    });
    it('LoginPage: Then login with empty username and password shows error message', () => {
      cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', l10n.errors.usernameIsRequired);
    });
    it('LoginPage: Then warning message has a red background', () => {
      cy.get(loginPage.error).should('have.css', 'background-color', colours.ERROR);
    });
    it('LoginPage: Then username field is marked with error class', () => {
      cy.get(loginPage.usernameInput).should('have.class', 'error');
      cy.get(loginPage.usernameInput).should('have.css', 'border-bottom-color', colours.ERROR);
      cy.get(loginPage.usernameInput).parent().find(loginPage.errorIcon).should('be.visible');
      });
    it('LoginPage: Then password field is marked with error class', () => {
      cy.get(loginPage.passwordInput).should('have.class', 'error');
      cy.get(loginPage.passwordInput).should('have.css', 'border-bottom-color', colours.ERROR);
      cy.get(loginPage.passwordInput).parent().find(loginPage.errorIcon).should('be.visible');
      });
  });

  context('LoginPage: When user closes the warning message ', () => {
    before(() => {
      cy.get(loginPage.errorCloseButton).click();
      });
    it('LoginPage: The error message disappears', () => {
      cy.get(loginPage.errorMessage).should('not.exist');
       });
    it('LoginPage: Username field is not highlighted as error', () => {
      cy.get(loginPage.usernameInput).should('not.have.class', 'error');
      });
    it('LoginPage: Password field is not highlighted as error', () => {
      cy.get(loginPage.passwordInput).should('not.have.class', 'error');
      });
  });

  context('LoginPage: When user fills in only username field ', () => {
      before(() => {
          cy.get(loginPage.usernameInput).type('secret');
          cy.get(loginPage.loginButton).click();
      });
      it('LoginPage: Then error message appears because only username field is filled in', () => {
          cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', l10n.errors.passwordIsRequired);
      });
      it('LoginPage: Then Password field is highlighted as error', () => {
          cy.get(loginPage.passwordInput).should('have.class', 'error');
      });
      it('LoginPage: Then Username field is not highlighted as error', () => {
          //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/4
          cy.get(loginPage.usernameInput).should('not.have.class', 'error');
      });
      it('LoginPage: Then the login button should be disabled when only username is filled', () => {
            //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/3
            cy.get(loginPage.loginButton).should('be.disabled');
          });
      after(() => {
          cy.get(loginPage.usernameInput).clear();
      });
  });

  context('LoginPage: When user fills in only password field ', () => {
      before(() => {
          cy.get(loginPage.usernameInput).clear();
          cy.get(loginPage.passwordInput).type('secret');
          cy.get(loginPage.loginButton).click();
      });
      it('LoginPage: Then error message appears because only password field is filled in', () => {
          cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', l10n.errors.usernameIsRequired);
              });
      it('LoginPage: Then Username field is highlighted as error', () => {
          cy.get(loginPage.usernameInput).should('have.class', 'error');
      });
      it('LoginPage: Then Password field is not highlighted as error', () => {
        //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/4
          cy.get(loginPage.passwordInput).should('not.have.class', 'error');
      });
      it('LoginPage: Then the login button should be disabled when only password is filled', () => {
          //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/3
          cy.get(loginPage.loginButton).should('be.disabled');
      });
      after(() => {
          cy.get(loginPage.passwordInput).clear();
      });
  });

  context('LoginPage: When user types wrong username in username field ', () => {
      before(() => {
          cy.get(loginPage.passwordInput).clear();
          cy.get(loginPage.usernameInput).type('wrong_user');
          cy.get(loginPage.passwordInput).type(standardUser.password);
          cy.get(loginPage.loginButton).click();
      });
      it('LoginPage: Then login with wrong username shows error message', () => {
          cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', l10n.errors.notFound);
  });
      after(() => {
          cy.get(loginPage.usernameInput).clear();
          cy.get(loginPage.passwordInput).clear();
      });
  });

  context('LoginPage: When user types wrong password in password field ', () => {
      before(() => {
          cy.get(loginPage.usernameInput).clear();
          cy.get(loginPage.passwordInput).clear();
          cy.get(loginPage.usernameInput).type(standardUser.username);
          cy.get(loginPage.passwordInput).type('wrong_password');
          cy.get(loginPage.loginButton).click();
        });
      it('LoginPage: Then login with wrong password shows error message', () => {
          cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', l10n.errors.notFound);
      });
      after(() => {
          cy.get(loginPage.usernameInput).clear();
          cy.get(loginPage.passwordInput).clear();
      });
});

  context('LoginPage.STANDARD: When user logs in with valid credentials', () => {
      before(() => {
          cy.get(loginPage.usernameInput).clear();
          cy.get(loginPage.passwordInput).clear();
          cy.loginPage_FillLoginForm(standardUser);
          cy.get(loginPage.loginButton).click();
      });
      it('LoginPage: Then user is redirected to the inventory page', () => {
          cy.url().should('eq', urls.inventoryPage);
          cy.get(inventoryPage.inventoryTitle).should('have.text', l10n.inventoryPage.inventoryTitle).and('be.visible');
      });
  });

  context('LoginPage.STANDARD: When user logs out', () => {
      before(() => {
          cy.logout();
      });
      it('LoginPage: Then user can log out successfully', () => {
          cy.url().should('eq', urls.baseUrl);
          cy.get(loginPage.loginButton).should('be.visible');
      });
  });

  context('LoginPage: When unauthorized user tries to access /inventory directly', () => {
      it('LoginPage: Then they are redirected to the login page', () => {
          cy.visit('/inventory.html', { failOnStatusCode: false });
          cy.url().should('eq', urls.baseUrl);
          cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', l10n.errors.restrictedPageOpened);
          cy.get(loginPage.loginButton).should('be.visible');
      });
  });

  context('LoginPage.LOCKED: When locked user tries to login', () => {
      before(() => {
          cy.loginPage_FillLoginForm(lockedUser);
          cy.get(loginPage.loginButton).click();
      });
      it('LoginPage: Then user sees error that account is locked', () => {
          cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', l10n.errors.userIsLockedOut);
          cy.url().should('eq', urls.baseUrl);
          cy.get(loginPage.loginButton).should('be.visible');
      });
  });
});
