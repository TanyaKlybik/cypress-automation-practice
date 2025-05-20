describe('LoginPage: Given login page is open', { testIsolatioпn: false }, () => {
  before(() => {
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

    it('LoginPage: Then the login button should be disabled when only password is filled', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/3
      cy.get(loginPage.passwordInput).type('secret');
      cy.get(loginPage.loginButton).should('be.disabled');
    });
  });
});

context.skip('LoginPage: When user tries to login with invalid data', () => {
  it.skip('LoginPage: Then login with empty username and password shows validation', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then login with empty username shows validation', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then login with empty password shows validation', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then login with wrong username shows error message', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then login with wrong password shows error message', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then error can be dismissed with close button', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then after closing error, fields are no longer highlighted', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then focus moves to first empty field on submit', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then login button is disabled if one or both fields are empty', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then pressing Enter submits the form', () => {
    // Not implemented yet
  });
});

context.skip('LoginPage: When user logs in with valid credentials', () => {
  it.skip('LoginPage: Then user is redirected to the inventory page', () => {
    // Not implemented yet
  });
});

context.skip('LoginPage: When unauthorized user tries to access /inventory directly', () => {
  it.skip('LoginPage: Then they are redirected to the login page', () => {
    // Not implemented yet
  });
});

context.skip('LoginPage: When user logs in with different user types', () => {
  it.skip('LoginPage: Then standard_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then problem_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then performance_glitch_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then error_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('LoginPage: Then locked_out_user sees error that account is locked', () => {
    // Not implemented yet
  });
});
