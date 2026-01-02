# Naming Conventions

## File Naming

- Use `kebab-case` for all file names.
  UI test files end with `.ui.cy.js`
  Example: `login-form.ui.cy.js`
  API test files end with `.api.cy.js`
  Example: `users-get.api.cy.js`

- Group files by functionality.
  Example: `auth/login-form.ui.cy.js`

## Components

- Use `PascalCase` for component names.
  Example: `LoginForm`, `CartItem`

## Tests

- Test filenames must end with `.cy.js` to clearly indicate Cypress tests (UI: `.ui.cy.js`, API: `.api.cy.js`).
- Use clear and descriptive names in test cases:

```js
it('logs in with valid credentials', () => {
  // test logic
});
```

### Naming Conventions for `describe`, `context`, and `it` blocks

- **`describe` block**:
  Used for describing the component or functionality being tested. The name should be clear and descriptive, usually in the format `Component/Page: Feature` or `Component/Page: Action` - UI and `[HTTP method] [endpoint]: [Given...]` - API. This helps to quickly understand what is being tested in that block.

  **Example**:

  ```js
  UI
  describe('LoginPage: Given login page is open', () => { ... });
  describe('CartItem: When user adds an item to the cart', () => { ... });

  API
  describe('Booking GET: Given user list exists', () => { ... });
  describe('Booking POST: Given valid credentials', () => { ... });
  ```

- **`context` block**:
  Used for describing conditions or scenarios in which the tests are executed. Typically starts with the keyword "When" (or similar). The context should clarify under what conditions the test is performed.

  **Example**:

  ```js
  UI
  context('LoginPage: When login page loads', () => { ... });
  context('CartItem: When user submits a form with invalid data', () => { ... });

  API
  context('Booking POST: When sending valid request', () => { ... });
  context('Booking POST: When token is missing', () => { ... });
  ```

- **`it` block**:
  Used for describing individual tests or assertions. It usually starts with the keyword "Then" (or similar) to describe the expected behavior of the component or functionality under the given conditions.

  **Example**:

  ```js
  UI
  it('LoginPage: Then it should display the login button', () => { ... });
  it('LoginPage: Then it should show an error message when the password is incorrect', () => { ... });

  API
  it('Booking GET: Then it should return 200 and list of users', () => { ... });
  it('Booking POST: Then it should return 401 for invalid token', () => { ... });

  ```

- **Keywords**:
  - **`Given`** — describes the initial state.
  - **`When`** — describes the action or scenario.
  - **`Then`** — describes the expected outcome.
  - You may also use other keywords like `And`, `But` to describe additional conditions or steps.
