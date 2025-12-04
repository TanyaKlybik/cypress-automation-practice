Cypress.Commands.add('getToken', () => {
  const apiAuth = Cypress.env('apiAuth');
  if (!apiAuth) {
    throw new Error('❌ apiAuth is missing! Check sensitive-data/api-auth.json');
  }
  const admin = apiAuth.ApiAdmin;
  return cy
    .request({
      method: 'POST',
      url: urls.apiAuth,
      body: {
        username: admin.username,
        password: admin.password,
      },
    })
    .then((response) => {
      return response.body.token;
    });
});

Cypress.Commands.add('createBooking', (bookingData, options = {}) => {
  const requestOptions = {
    method: 'POST',
    url: urls.apiBooking,
    body: bookingData,
    ...options,
  };
  cy.log('createBooking requestOptions:', JSON.stringify(requestOptions));
  return cy.request(requestOptions);
});

Cypress.Commands.add('getAllBookings', () => {
  return cy.request({
    method: 'GET',
    url: urls.apiBooking,
  });
});

Cypress.Commands.add('getBookingById', (bookingId) => {
  return cy.request({
    method: 'GET',
    url: urls.apiBookingById(bookingId),
  });
});

Cypress.Commands.add('getBookingsByFilter', (filter) => {
  return cy.request({
    method: 'GET',
    url: urls.apiBooking,
    qs: filter,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('updateBooking', (bookingId, updateData) => {
  const apiAuth = Cypress.env('apiAuth');
  const admin = apiAuth?.ApiAdmin;

  if (!admin) {
    throw new Error('apiAuth.ApiAdmin is missing! Проверьте api-auth.json и конфиг Cypress.');
  }
  return cy
    .request({
      method: 'POST',
      url: urls.apiAuth,
      body: { username: admin.username, password: admin.password },
    })
    .then((auth) => {
      return cy.request({
        method: 'PATCH',
        url: urls.apiBookingById(bookingId),
        headers: { Cookie: `token=${auth.body.token}` },
        body: updateData,
      });
    });
});
