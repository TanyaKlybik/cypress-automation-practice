import selectors from '../../support/selectors';
import l10n from '../../support/l10n.json';
describe('LoginPage: Given login page is open', { testIsolation: false }, () => {
  before(() => {
    cy.visit('/');
  });

  context('LoginPage.UIelements: When login page loads', () => {
    it('Then the page title should be visible', () => {
      cy.contains(l10n.loginPage.title).should('be.visible');
    });

    it('Then the username field should be empty with correct placeholder', () => {
      cy.get(selectors.loginPage.usernameInput).should('be.visible').and('have.attr', 'placeholder', l10n.loginPage.username).and('have.value', '');
    });

    it('Then the password field should be empty with correct placeholder', () => {
      cy.get(selectors.loginPage.passwordInput).should('be.visible').and('have.attr', 'placeholder', l10n.loginPage.password).and('have.value', '');
    });

    it('Then the login button should be enabled with correct label', () => {
      cy.get(selectors.loginPage.loginButton).should('be.visible').and('have.value', l10n.loginPage.login).and('be.enabled');
    });

    it('Then the login button should be disabled when only password is filled', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/3
      cy.get(selectors.loginPage.passwordInput).type('secret');
      cy.get(selectors.loginPage.loginButton).should('be.disabled');
    });
  });
});

context.skip('LoginPage.ValidationErrors: When user tries to login with invalid data', () => {
  it.skip('Then login with empty username and password shows validation', () => {
    // Not implemented yet
  });
  it.skip('Then login with empty username shows validation', () => {
    // Not implemented yet
  });
  it.skip('Then login with empty password shows validation', () => {
    // Not implemented yet
  });
  it.skip('Then login with wrong username shows error message', () => {
    // Not implemented yet
  });
  it.skip('Then login with wrong password shows error message', () => {
    // Not implemented yet
  });
  it.skip('Then error can be dismissed with close button', () => {
    // Not implemented yet
  });
  it.skip('Then after closing error, fields are no longer highlighted', () => {
    // Not implemented yet
  });
  it.skip('Then focus moves to first empty field on submit', () => {
    // Not implemented yet
  });
  it.skip('Then login button is disabled if one or both fields are empty', () => {
    // Not implemented yet
  });
  it.skip('Then pressing Enter submits the form', () => {
    // Not implemented yet
  });
});

context.skip('LoginPage.AuthSuccessFlow: When user logs in with valid credentials', () => {
  it.skip('Then user is redirected to the inventory page', () => {
    // Not implemented yet
  });
  it.skip('Then username and password fields are cleared after successful login', () => {
    // Not implemented yet
  });
  it.skip('Then login persists session with cookies/localStorage (if applicable)', () => {
    // Not implemented yet
  });
});

context.skip('LoginPage.SessionRestoreState: When user refreshes the page', () => {
  it.skip('Then if not logged in, fields are empty and login page remains', () => {
    // Not implemented yet
  });
});

context.skip('LoginPage.SecurityRedirects: When unauthorized user tries to access /inventory directly', () => {
  it.skip('Then they are redirected to the login page', () => {
    // Not implemented yet
  });
});

context.skip('LoginPage.UserTypes: When user logs in with different user types', () => {
  it.skip('Then standard_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('Then problem_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('Then performance_glitch_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('Then error_user can login successfully', () => {
    // Not implemented yet
  });
  it.skip('Then locked_out_user sees error that account is locked', () => {
    // Not implemented yet
  });
});
