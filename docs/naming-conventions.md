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
```

### Naming Conventions for `describe`, `context`, and `it` blocks

- **`describe` block**:  
  Used for describing the component or functionality being tested. The name should be clear and descriptive, usually in the format `Component/Page: Feature` or `Component/Page: Action`. This helps to quickly understand what is being tested in that block.

  **Example**:

  ```js
  describe('LoginPage: Given login page is open', () => { ... });
  describe('CartItem: When user adds an item to the cart', () => { ... });
  ```

- **`context` block**:  
  Used for describing conditions or scenarios in which the tests are executed. Typically starts with the keyword "When" (or similar). The context should clarify under what conditions the test is performed.

  **Example**:

  ```js
  context('When login page loads', () => { ... });
  context('When user submits a form with invalid data', () => { ... });
  ```

- **`it` block**:  
  Used for describing individual tests or assertions. It usually starts with the keyword "Then" (or similar) to describe the expected behavior of the component or functionality under the given conditions.

  **Example**:

  ```js
  it('Then it should display the login button', () => { ... });
  it('Then it should show an error message when the password is incorrect', () => { ... });
  ```

- **Keywords**:
  - **`Given`** — describes the initial state.
  - **`When`** — describes the action or scenario.
  - **`Then`** — describes the expected outcome.
  - You may also use other keywords like `And`, `But` to describe additional conditions or steps.
