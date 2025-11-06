const parsePrice = (text) => {
  if (text == null) return 0;
  return parseFloat(String(text).replace(/[^\d.]/g, ''));
};

const calculateTax = (amount, rate = 8) => {
  return Math.round(parsePrice(amount) * (rate / 100) * 100) / 100;
};

const checkTotal = (itemTotalSelector, taxSelector, totalSelector) => {
  cy.get(itemTotalSelector)
    .invoke('text')
    .then((itemText) => {
      const itemTotal = parsePrice(itemText);

      cy.get(taxSelector)
        .invoke('text')
        .then((taxText) => {
          const tax = parsePrice(taxText);

          cy.get(totalSelector)
            .invoke('text')
            .then((totalText) => {
              const total = parsePrice(totalText);
              const expectedTotal = Math.round((itemTotal + tax) * 100) / 100;
              expect(total).to.eq(expectedTotal);
            });
        });
    });
};

const sumPrices = (pricesArray) => {
  const total = pricesArray.map(parsePrice).reduce((acc, price) => acc + price, 0);
  return Math.round(total * 100) / 100;
};

const calculateTaxFromPrices = (pricesArray, rate = 8) => {
  return calculateTax(sumPrices(pricesArray), rate);
};

export default {
  parsePrice,
  calculateTax,
  checkTotal,
  sumPrices,
  calculateTaxFromPrices,
};
