export const checkoutInfo = {
  indicesOfProducts: utils.generateArrayOfRandomIndices(utils.getRandomNumber(1, requirements.inventoryPage.numberOfProductsOnThePage), requirements.inventoryPage.numberOfProductsOnThePage - 1),
  chosenProducts: [],
  testDataUser: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  validData: {
    firstName: 'John123456789',
    lastName: 'Doe1234567890',
    postalCode: 'AB-1234567889',
  },
  taxPercent: 8,
};
