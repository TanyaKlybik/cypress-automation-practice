Cypress.Commands.add('restfulGetToken', () => {
  const apiAuth = Cypress.env('apiAuth');
  if (!apiAuth) throw new Error('apiAuth is missing! Check sensitive-data/api-auth.json');
  const admin = apiAuth.ApiAdmin;
  if (!admin) throw new Error('ApiAdmin not found in apiAuth');
  cy.log(`Using API user: ${admin.username}`);
  return cy
    .request({
      method: 'POST',
      url: urls.apiAuth,
      body: {
        username: admin.username,
        password: admin.password,
      },
    })
    .then((res) => {
      if (!res.body?.token) throw new Error('Token not returned from API');
      return res.body.token;
    });
});

Cypress.Commands.add('restfulGetTokenNegative', () => {
  const apiAuth = Cypress.env('apiAuth');
  if (!apiAuth) {
    throw new Error('apiAuth is missing! Check sensitive-data/api-auth.json');
  }
  const admin = apiAuth.ApiAdmin;
  return cy
    .request({
      method: 'POST',
      url: urls.apiAuth,
      body: {
        username: admin.username,
        password: admin.wrongPassword,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.status).to.eq(401);
      return response;
    });
});

Cypress.Commands.add('restfulCreateBooking', (bookingData, options = {}) => {
  const requestOptions = {
    method: 'POST',
    url: urls.apiBooking,
    body: bookingData,
    ...options,
  };
  return cy.request(requestOptions);
});

Cypress.Commands.add('restfulGetAllBookings', () => {
  return cy.request({
    method: 'GET',
    url: urls.apiBooking,
  });
});

Cypress.Commands.add('restfulGetBookingById', (bookingId) => {
  return cy.request({
    method: 'GET',
    url: urls.apiBookingById(bookingId),
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('restfulGetBookingsByFilter', (filter) => {
  return cy.request({
    method: 'GET',
    url: urls.apiBooking,
    qs: filter,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('restfulUpdateBooking', (bookingId, updateData) => {
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

Cypress.Commands.add('restfulDeleteBooking', (bookingId) => {
  return cy.restfulGetToken().then((token) => {
    return cy.request({
      method: 'DELETE',
      url: urls.apiBookingById(bookingId),
      headers: {
        Cookie: `token=${token}`,
      },
      failOnStatusCode: false,
    });
  });
});
