import { RestfulBooking, RestfulTestDates, RestfulBookingNegative } from '../../test-data/booking.test-data';

describe('RestfulBooker API: Given the Restful Booker API is available', { testIsolation: false }, () => {
  let bookingId = null;

  context.skip('RestfulBooker.Auth.Negative: When generate token with invalid credentials', () => {
    it.skip('RestfulBooker.POST.Negative: Then it should return 401 when password is invalid', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/21
      cy.restfulGetTokenNegative();
    });
  });

  context('RestfulBooker.POST: When creating a new booking', () => {
    it('RestfulBooker.POST.Positive: Then it should return 200 and booking id', () => {
      cy.restfulCreateBooking(RestfulBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        bookingId = response.body.bookingid;
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
      cy.restfulCreateBooking(RestfulBookingNegative.InvalidPriceType, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should not create booking when checkin is later than checkout', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.restfulCreateBooking(RestfulBookingNegative.CheckinAfterCheckout, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should not create booking when checkin equals checkout', () => {
      cy.restfulCreateBooking(RestfulBookingNegative.CheckinEqualCheckout, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should not create booking when checkin is in the past', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.restfulCreateBooking(RestfulBookingNegative.CheckinInPast, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinInPast);
      });
    });
    it.skip('RestfulBooker.POST.Negative: Then it should not create booking with invalid date format', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/18
      cy.restfulCreateBooking(RestfulBookingNegative.InvalidDateFormat, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.invalidDateFormat);
      });
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
        expect(response.body.firstname).to.eq(RestfulBooking.firstname);
      });
    });
  });

  context('RestfulBooker.GET: When searching bookings by name', () => {
    it('RestfulBooker.GET: Then it should return bookings filtered by firstname', () => {
      cy.restfulGetBookingsByFilter({ firstname: RestfulBooking.firstname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
    it('RestfulBooker.GET: Then it should return bookings filtered by lastname', () => {
      cy.restfulGetBookingsByFilter({ lastname: RestfulBooking.lastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context('RestfulBooker.GET: When searching bookings by dates', () => {
    it.skip('RestfulBooker.GET: Then it should return bookings filtered by checkin', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/19
      cy.restfulGetBookingsByFilter({ checkin: RestfulBooking.bookingdates.checkin }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
    it('RestfulBooker.GET: Then it should return bookings filtered by checkout', () => {
      cy.restfulGetBookingsByFilter({ checkout: RestfulBooking.bookingdates.checkout }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context('RestfulBooker.PATCH: When updating booking data', () => {
    it('RestfulBooker.PATCH: Then it should update the random field and return 200: ${field}', () => {
      cy.getRandomBookingUpdateField().then(({ field, value }) => {
        const patchBody = field === 'bookingdates' ? { bookingdates: value } : { [field]: value };

        cy.restfulUpdateBooking(bookingId, patchBody).then((response) => {
          expect(response.status).to.eq(200);

          if (field === 'bookingdates') {
            expect(response.body.bookingdates.checkin).to.eq(value.checkin);
            expect(response.body.bookingdates.checkout).to.eq(value.checkout);
          } else {
            expect(response.body[field]).to.eq(value);
          }

          cy.log(`Updated random field: ${field}`);
        });
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
      const patchBody = { bookingdates: { checkin: RestfulTestDates.futureCheckout, checkout: RestfulTestDates.futureCheckin } };
      cy.restfulUpdateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with check-in in the past', () => {
    it.skip('RestfulBooker.PATCH.Negative: Then it should not update when checkin is in the past', () => {
      const patchBody = { bookingdates: { checkin: RestfulTestDates.pastCheckin } };
      cy.restfulUpdateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinInPast);
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with check-in equal to checkout', () => {
    it.skip('RestfulBooker.PATCH.Negative: Then it should not update when checkin equals checkout', () => {
      const patchBody = { bookingdates: { checkin: RestfulTestDates.sameDate, checkout: RestfulTestDates.sameDate } };
      cy.restfulUpdateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
      });
    });
  });

  context.skip('RestfulBooker.PATCH.Negative: When updating with invalid date format', () => {
    it.skip('RestfulBooker.PATCH.Negative: Then it should not update when date format is invalid', () => {
      const patchBody = { bookingdates: { checkin: RestfulTestDates.invalidFormat } };
      cy.restfulUpdateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.invalidDateFormat);
      });
    });
  });

  context('RestfulBooker.DELETE: When deleting a booking', () => {
    it('RestfulBooker.DELETE: Then it should return 201', () => {
      cy.restfulDeleteBooking(bookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
    it('RestfulBooker.GET: Then it should return 404', () => {
      cy.restfulGetBookingById(bookingId).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
