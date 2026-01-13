import { testData } from '../../test-data/booking.test-data';

describe('RestfulBooker API: Given the Restful Booker API is available', { testIsolation: false }, () => {
  let adminToken;

  before(() => {
    cy.restfullBooker__getAuthToken__GET(userRoles.API_ADMIN).then((token) => {
      adminToken = token;
    });
  });

  context('RestfulBooker.POST: When creating a new booking', () => {
    it('RestfulBooker.POST.Positive: Then it should return 200 and booking id', () => {
      cy.restfulCreateBooking(testData.restfulBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        testData.bookingId = response.body.bookingid;
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should fail with random mandatory field: ${field}', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/16
      cy.getRandomMandatoryField().then(({ field, data }) => {
        cy.restfulCreateBooking(data, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
          cy.log(`Tested random field: ${field}`);
        });
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should not create booking with invalid price format', () => {
      cy.restfulCreateBooking(testData.restfulBookingNegative.InvalidPriceType, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should not create booking when checkin is later than checkout', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.restfulCreateBooking(testData.restfulBookingNegative.CheckinAfterCheckout, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
      });
    });

    it.skip('RestfulBooker.POST.Negative: Then it should not create booking when checkin equals checkout', () => {
      cy.restfulCreateBooking(testData.restfulBookingNegative.CheckinEqualCheckout, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
      });
    });

    it.skip('RestfulBooker.POST.Negative: Then it should not create booking when checkin is in the past', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.restfulCreateBooking(testData.restfulBookingNegative.CheckinInPast, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinInPast);
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should not create booking with invalid date format', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/18
      cy.restfulCreateBooking(testData.restfulBookingNegative.InvalidDateFormat, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.invalidDateFormat);
      });
    });
  });

  context.skip('RestfulBooker.Auth.Negative: When generate token with invalid credentials', () => {
    it.skip('RestfulBooker.POST.Negative: Then it should return 401 when password is invalid', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/21
      cy.restfulGetTokenNegative();
    });
  });

  context('RestfulBooker.GET: When requesting all bookings', () => {
    it('RestfulBooker.GET: Then it should return 200 and an array', () => {
      cy.restfulGetAllBookings().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context('RestfulBooker.GETbyID: When requesting booking by id', () => {
    it('RestfulBooker.GETbyID: Then it should return 200 and booking details', () => {
      cy.restfulGetBookingById(bookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.restfulBooking.firstname);
      });
    });
  });

  context('RestfulBooker.GET: When searching bookings by name', () => {
    it('RestfulBooker.GET: Then it should return bookings filtered by firstname', () => {
      cy.restfulGetBookingsByFilter({ firstname: testData.restfulBooking.firstname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
    it('RestfulBooker.GET: Then it should return bookings filtered by lastname', () => {
      cy.restfulGetBookingsByFilter({ lastname: testData.restfulBooking.lastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context('RestfulBooker.GET: When searching bookings by dates', () => {
    it.skip('RestfulBooker.GET: Then it should return bookings filtered by checkin', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/19
      cy.restfulGetBookingsByFilter({ checkin: testData.restfulBooking.bookingdates.checkin }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
    it('RestfulBooker.GET: Then it should return bookings filtered by checkout', () => {
      cy.restfulGetBookingsByFilter({ checkout: testData.restfulBooking.bookingdates.checkout }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context('RestfulBooker.PATCH: When updating booking data', () => {
    let patchBody;
    let field;
    before(() => {
      cy.getRandomBookingUpdateField().then(({ field, value }) => {
        field = field.toLowerCase();
        patchBody = field === 'bookingdates' ? { bookingdates: value } : { [field]: value };
      });
    });
    it(`RestfulBooker.PATCH: Then it should update the random field '${field}' and return 200`, () => {
      cy.restfulUpdateBooking(adminToken, bookingId, patchBody).then((response) => {
        expect(response.status).to.eq(200);
        if (field === 'bookingdates') {
          expect(response.body.bookingdates.checkin).to.eq(patchBody.value.checkin);
          expect(response.body.bookingdates.checkout).to.eq(patchBody.value.checkout);
        } else {
          expect(response.body[field]).to.eq(patchBody.value);
        }
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with empty required fields', () => {
    it.skip(`RestfulBooker.PATCH.Negative: Then it should fail with random empty mandatory`, () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/20
      cy.getRandomMandatoryField().then(({ field, data }) => {
        cy.restfulUpdateBooking(bookingId, data, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          cy.log(`Tried to update random empty mandatory field: ${field}`);
        });
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with check-in later than checkout', () => {
    it.skip('RestfulBooker.PATCH.Negative: Then it should not update when checkin is later than checkout', () => {
      const patchBody = { bookingdates: { checkin: testData.restfulTestDates.futureCheckout, checkout: testData.restfulTestDates.futureCheckin } };
      cy.restfulUpdateBooking(adminToken, bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with check-in in the past', () => {
    it.skip('RestfulBooker.PATCH.Negative: Then it should not update when checkin is in the past', () => {
      const patchBody = { bookingdates: { checkin: testData.restfulTestDates.pastCheckin } };
      cy.restfulUpdateBooking(adminToken, bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinInPast);
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with check-in equal to checkout', () => {
    it.skip('RestfulBooker.PATCH.Negative: Then it should not update when checkin equals checkout', () => {
      cy.restfulUpdateBooking(adminToken, bookingId, testData.updatedItems.checkInEqualToCheckout, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with invalid date format', () => {
    it.skip('RestfulBooker.PATCH.Negative: Then it should not update when date format is invalid', () => {
      const patchBody = { bookingdates: { checkin: RestfulTestDates.invalidFormat } };
      cy.restfulUpdateBooking(adminToken, bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.invalidDateFormat);
      });
    });
  });

  context('RestfulBooker.DELETE: When deleting a booking', () => {
    it('RestfulBooker.DELETE: Then it should return 201', () => {
      cy.restfulDeleteBooking(adminToken, bookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
});
