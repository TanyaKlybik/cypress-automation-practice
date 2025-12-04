import { Booking, BookingUpdate, BookingNegative, mandatoryFields, nameFilters, dateFilters } from '../../test-data/booking.test-data';

describe('Booking API: Given the Restful Booker API is available', { testIsolation: false }, () => {
  let bookingId = null;

  context('Booking POST: When creating a new booking', () => {
    it('POST.Positive: Then it should return 200 and booking id', () => {
      cy.createBooking(Booking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        bookingId = response.body.bookingid;
      });
    });
    mandatoryFields.forEach(({ field, data, error }) => {
      it.skip(`POST.Negative: Should not create booking with empty ${field}`, () => {
        //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/16
        cy.createBooking(data, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(error);
        });
      });
    });
    it('POST.Negative: Then it should not create booking with invalid price format', () => {
      cy.createBooking(BookingNegative.InvalidPrice, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.internalServerError);
      });
    });
    it.skip('POST.Negative: Then it should not create booking when checkin is later than checkout', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.createBooking(BookingNegative.CheckinAfterCheckout, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(Errors.apiBooking.errors.checkinAfterCheckout);
      });
    });
    it('POST.Negative: Then it should not create booking when checkin equals checkout', () => {
      cy.createBooking(BookingNegative.EqualDates, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.internalServerError);
      });
    });
    it.skip('POST.Negative: Then it should not create booking when checkin is in the past', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.createBooking(BookingNegative.CheckinInPast, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(Errors.apiBooking.errors.checkinInPast);
      });
    });
    it.skip('POST.Negative: Then it should not create booking with invalid date format', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/18
      cy.createBooking(BookingNegative.InvalidDateFormat, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(Errors.apiBooking.errors.invalidDateFormat);
      });
    });
  });

  context('Booking GET: When requesting all bookings', () => {
    it('Booking GET: Then it should return 200 and an array', () => {
      cy.getAllBookings().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context('Booking GET by ID: When requesting booking by id', () => {
    it('Booking GET by ID: Then it should return 200 and booking details', () => {
      cy.getBookingById(bookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(Booking.firstname);
      });
    });
  });

  context('Booking GET: Searching bookings by name', () => {
    nameFilters.forEach(({ field, value }) => {
      it(`GET: Then it should return bookings filtered by ${field}`, () => {
        cy.getBookingsByFilter({ [field]: value }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.greaterThan(0);
          response.body.slice(0, 5).forEach((b) => {
            cy.getBookingById(b.bookingid).then((res) => {
              expect(res.body[field]).to.eq(value);
            });
          });
        });
      });
    });
  });

  context('Booking GET: Searching bookings by dates', () => {
    dateFilters.forEach(({ field, value }) => {
      it.skip(`GET: Then it should return bookings filtered by ${field}`, () => {
        //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/19
        cy.getBookingsByFilter({ [field]: value }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.greaterThan(0);
          response.body.slice(0, 5).forEach((b) => {
            cy.getBookingById(b.bookingid).then((res) => {
              const actualDate = new Date(res.body.bookingdates[field]);
              const expectedDate = new Date(value);
              expect(actualDate.getTime()).to.be.at.least(expectedDate.getTime());
            });
          });
        });
      });
    });
  });

  context('Booking PATCH: When updating booking data', () => {
    it('Booking PATCH: Then it should update the booking and return 200', () => {
      cy.updateBooking(bookingId, BookingUpdate).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(BookingUpdate.firstname);
      });
    });
  });
});
