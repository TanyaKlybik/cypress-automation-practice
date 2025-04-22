# Naming Conventions

## File Naming

- Use `kebab-case` for all file names.  
  Example: `login-form.cy.js`
- Group files by functionality.  
  Example: `auth/login-form.cy.js`

## Components

- Use `PascalCase` for component names.  
  Example: `LoginForm`, `CartItem`

## Tests

- Test filenames must end with `.cy.js` to clearly indicate Cypress tests.
- Use clear and descriptive names in test cases:

```js
it('logs in with valid credentials', () => {
  // test logic
});