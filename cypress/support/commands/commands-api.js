import { RestfulBookingUpdate, RestfulMandatoryFields } from '../../test-data/booking.test-data';

Cypress.Commands.add('restfullBooker__getAuthToken__GET', (userRole) => {
  let username;
  let password;
  cy.then(() => {
    cy.getUserDataByRole(userRole).then((user) => {
      username = user.username;
      password = user.password;
    });
  });
  return cy.then(() => {
    cy.request({
      method: 'POST',
      url: urls.apiAuth,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username,
        password,
      },
    }).then((res) => {
      return res.body.token;
    });
  });
});

Cypress.Commands.add('restfulGetTokenNegative', () => {
  const apiAuth = Cypress.env('apiAuth');
  if (!apiAuth) {
    throw new Error('apiAuth is missing! Check sensitive-data/env-users.json');
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
  return cy.request({
    method: 'POST',
    url: urls.apiBooking,
    body: bookingData,
    ...options,
  });
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

Cypress.Commands.add('restfulUpdateBooking', (token, bookingId, updateData, options = {}) => {
  return cy.request({
    method: 'PATCH',
    url: urls.apiBookingById(bookingId),
    headers: { Cookie: `token=${token}` },
    body: updateData,
    ...options,
  });
});

Cypress.Commands.add('restfulDeleteBooking', (token, bookingId) => {
  return cy.request({
    method: 'DELETE',
    url: urls.apiBookingById(bookingId),
    headers: {
      Cookie: `token=${token}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getRandomMandatoryField', () => {
  const randomIndex = Math.floor(Math.random() * RestfulMandatoryFields.length);
  return RestfulMandatoryFields[randomIndex];
});

Cypress.Commands.add('getRandomBookingUpdateField', () => {
  const randomIndex = Math.floor(Math.random() * RestfulBookingUpdate.length);
  return RestfulBookingUpdate[randomIndex];
});
