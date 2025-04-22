// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import l10n from './l10n.json';
import reqs from './requirements';
import urls from './urls';
import selectors from './selectors';

Cypress.env('l10n', l10n);
Cypress.env('reqs', reqs);
Cypress.env('urls', urls);
Cypress.env('selectors', selectors);
