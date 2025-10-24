// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Import necessary modules and resources
import l10n from './l10n.json';
import selectors from './selectors';
import requirements from './requirements';
import urls from './urls';
import utils from './utils';
import userRoles from './user-roles';
import colours from './colours';

// Make resources globally available
global.l10n = l10n;
global.requirements = requirements;
global.loginPage = selectors.loginPage;
global.inventoryPage = selectors.inventoryPage;
global.productPage = selectors.productPage;
global.footer = selectors.footer;
global.menu = selectors.menu;
global.cartPage = selectors.cartPage;
global.checkOutInfoPage = selectors.checkOutInfoPage;
global.checkOutOverviewPage = selectors.checkOutOverviewPage;
global.checkOutCompletePage = selectors.checkOutCompletePage;
global.urls = urls;
global.utils = utils;
global.userRoles = userRoles.userRoles;
global.colours = colours;
