const loginPage = {
  title: '.login_logo',
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  errorIcon: '[data-icon="times-circle"]',
  errorCloseButton: '[data-test="error-button"]',
  error: '.error-message-container',
};

const inventoryPage = {
  inventoryTitle: '[data-test="title"]',
  inventoryContainer: '[data-test="inventory-list"]',
  inventoryItem: '[data-test="inventory-item"]',
  inventoryItemName: '[data-test="inventory-item-name"]',
  inventoryItemDesc: '[data-test="inventory-item-desc"]',
  inventoryItemPrice: '[data-test="inventory-item-price"]',
  addToCartButton: '[data-test^="add-to-cart"]',
  removeButton: '[data-test^="remove"]',
  sortDropdown: '[data-test="product-sort-container"]',
  inventoryItemImage: '[data-test="inventory-item-img"]',
};

const productPage = {
  productImage: '.inventory_details_img',
  productName: '[data-test="inventory-item-name"]',
  productDesc: '[data-test="inventory-item-desc"]',
  productPrice: '[data-test="inventory-item-price"]',
  productRemoveButton: 'button[data-test^="remove"]',
};

const footer = {
  twitterIcon: '[data-test="social-twitter"]',
  facebookIcon: '[data-test="social-facebook"]',
  linkedinIcon: '[data-test="social-linkedin"]',
  copyright: '[data-test="footer-copy"]',
};

const menu = {
  menuButton: '#react-burger-menu-btn',
  menuPanel: '.bm-menu',
  allItems: '[data-test="inventory-sidebar-link"]',
  about: '[data-test="about-sidebar-link"]',
  logoutButton: '[data-test="logout-sidebar-link"]',
  resetAppState: '[data-test="reset-sidebar-link"]',
  closeButton: '#react-burger-cross-btn',
};

const cartPage = {
  cartTitle: '[data-test="title"]',
  cartIcon: '[data-test="shopping-cart-link"]',
  cartBadge: '[data-test="shopping-cart-badge"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
  checkoutButton: '[data-test="checkout"]',
};

const checkOutInfoPage = {
  checkOutInfoTitle: '[data-test="title"]',
  cancelButton: '[data-test="cancel"]',
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  errorMessage: '[data-test="error"]'
};

const checkOutOverviewPage = {
  overviewTitle: '[data-test="title"]',
  finishButton: '[data-test="finish"]',
  cancelButton: '[data-test="cancel"]',
  itemContainer: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  itemPrice: '[data-test="inventory-item-price"]',
  itemQuantity: '[data-test="item-quantity"]',
  itemDescription: '[data-test="inventory-item-desc"]',
  paymentInfoLabel: '[data-test="payment-info-label"]',
  paymentInfoValue: '[data-test="payment-info-value"]',
  shippingInfoLabel: '[data-test="shipping-info-label"]',
  shippingInfoValue: '[data-test="shipping-info-value"]',
  summaryInfoLabel: '[data-test="total-info-label"]',
  summarySubtotal: '[data-test="subtotal-label"]',
  summaryTax: '[data-test="tax-label"]',
  summaryTotal: '[data-test="total-label"]'
};

const checkOutCompletePage = {
  completeTitle: '[data-test="title"]',
  completeHeader: '[data-test="complete-header"]',
  completeText: '[data-test="complete-text"]',
  backHomeButton: '[data-test="back-to-products"]'
};

export default {
  loginPage,
  inventoryPage,
  productPage,
  footer,
  menu,
  cartPage,
  checkOutInfoPage,
  checkOutOverviewPage,
  checkOutCompletePage
};
