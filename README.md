# cypress-automation-practice

## Running Cypress Tests

### Debug Mode

To run Cypress in debug mode, use the following command:

```sh
npx cypress open
```

This will open the Cypress Test Runner for interactive debugging.

### Headless Mode

To run Cypress tests in headless mode, use:

```sh
npx cypress run
```

This executes the tests in the command-line interface (CLI) without a UI.

## Maintenance

### Update Dependencies

If you want to update all dependencies to their latest versions regardless of the version ranges specified in your `package.json`, you can use:

```bash
npx npm-check-updates -u
```

Then, run:

```bash
npm install
```

## Documentation

For more details, refer to the documentation files:

- [Git Strategy](docs/git-strategy.md)
- [Hotkeys](docs/hotkeys.md)
- [Naming Conventions](docs/naming-conventions.md)
- [Test Writing Guideline](docs/test-writing-guideline.md)
