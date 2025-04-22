export const loginPage = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
};

//Example
// import { loginPage } from '../support/selectors';
// cy.get(loginPage.usernameInput).type('standard_user');
