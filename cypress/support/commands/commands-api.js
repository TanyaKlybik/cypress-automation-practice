import { testData } from '../../test-data/booking.test-data';

Cypress.Commands.add('restfullBooker__getAuthToken__POST', (userRole) => {
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

Cypress.Commands.add('restfullBooker__createBooking__POST', (bookingData, options = {}) => {
  return cy.request({
    method: 'POST',
    url: urls.apiBooking,
    body: bookingData,
    ...options,
  });
});

Cypress.Commands.add('restfullBooker__getAllBookings__GET', () => {
  return cy.request({
    method: 'GET',
    url: urls.apiBooking,
  });
});

Cypress.Commands.add('restfullBooker__getAllBookingsById__GET', (bookingId) => {
  return cy.request({
    method: 'GET',
    url: urls.apiBookingById(bookingId),
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('restfullBooker__getAllBookingsByFilter__GET', (filter) => {
  return cy.request({
    method: 'GET',
    url: urls.apiBooking,
    qs: filter,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('restfullBooker__updateBooking__PATCH', (token, bookingId, updateData, options = {}) => {
  return cy.request({
    method: 'PATCH',
    url: urls.apiBookingById(bookingId),
    headers: { Cookie: `token=${token}` },
    body: updateData,
    ...options,
  });
});

Cypress.Commands.add('restfullBooker__deleteBooking__DELETE', (token, bookingId) => {
  return cy.request({
    method: 'DELETE',
    url: urls.apiBookingById(bookingId),
    headers: {
      Cookie: `token=${token}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('restfullBooker__getRandomMandatoryField__GET', () => {
  const randomIndex = Math.floor(Math.random() * testData.restfulMandatoryFields.length);
  return testData.restfulMandatoryFields[randomIndex];
});

Cypress.Commands.add('restfullBooker__getRandomBookingUpdateField__GET', () => {
  const randomIndex = Math.floor(Math.random() * testData.restfulBookingUpdate.length);
  return testData.restfulBookingUpdate[randomIndex];
});

Cypress.Commands.add('restfullBooker__prepareBookingWithEmptyField__GET', (field) => {
  const bookingData = { ...testData.restfulBooking };
  if (field === 'checkin' || field === 'checkout') {
    bookingData.bookingdates = { ...bookingData.bookingdates, [field]: '' };
  } else {
    bookingData[field] = '';
  }
  return cy.wrap(bookingData);
});

Cypress.Commands.add('restfullBooker__prepareBookingWithUpdatedItem__GET',(updatedItemKey) => {
    const bookingData = {...testData.restfulBooking, bookingdates: { ...testData.restfulBooking.bookingdates }
    };
    const update = testData.updatedItems[updatedItemKey];
    if (!update) {
      throw new Error(`updatedItems does not contain key: ${updatedItemKey}`);
    }
    if (typeof update === 'object' && !Array.isArray(update)) {
      bookingData.bookingdates = {
        ...bookingData.bookingdates,
        ...update
      };
    } else {
      if (updatedItemKey === 'invalidPriceType') {
        bookingData.totalprice = update;
      }
      if (updatedItemKey === 'invalidDepositType') {
        bookingData.depositpaid = update;
      }
    }
    return cy.wrap(bookingData);
  }
);