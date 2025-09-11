const urls = {
  // Internal pages — use relative paths
  baseUrl: 'https://www.saucedemo.com/',
  // cy.visit('/');
  inventoryPage: 'https://www.saucedemo.com/inventory.html',
  //cy.visit('/inventory.html');
  cartPage: 'https://www.saucedemo.com/cart.html',
  //cy.visit('/cart.html');
  productDetailsPage: 'https://www.saucedemo.com/inventory-item.html',
  checkoutInfoPage: 'https://www.saucedemo.com/checkout-step-one.html',
  //cy.visit('/checkout-step-one.html');
  checkoutOverviewPage: 'https://www.saucedemo.com/checkout-step-two.html',
  //cy.visit('/checkout-step-two.html');
  checkoutCompletePage: 'https://www.saucedemo.com/checkout-complete.html',
  //cy.visit('/checkout-complete.html');

  // External links — absolute URLs
  aboutCompanyPage: 'https://saucelabs.com/',
  twitterPage: 'https://twitter.com/saucelabs',
  facebookPage: 'https://www.facebook.com/saucelabs',
  linkedinPage: 'https://www.linkedin.com/company/sauce-labs/',
  termsOfService: '',
  privacyPolicy: '',
};

module.exports = urls;
