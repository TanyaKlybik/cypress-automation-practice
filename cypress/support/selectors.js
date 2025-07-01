const loginPage = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  errorIcon: '[data-icon="times-circle"]',
  errorCloseButton: '[data-test="error-button"]',
  error: '.error-message-container',
 };

const inventoryPage = {
  inventoryTitle: '[class="title"]',
  inventoryContainer: '[class="inventory_list"]',
  inventoryItem: '[class="inventory_item"]',
  addToCartButton: '[data-test^="add-to-cart"]',
  removeButton: '[data-test^="remove"]',
  cartIcon: '.shopping_cart_link',
  sortDropdown: '[data-test="product_sort_container"]',
};

const menu = {
  menuButton: '#react-burger-menu-btn',
  logoutButton: '#logout_sidebar_link',
};

export default {
  loginPage,
  inventoryPage,
  menu
};