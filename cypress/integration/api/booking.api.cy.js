import { Booking, BookingUpdate, TestDates, BookingNegative, mandatoryFields, nameFilters, dateFilters } from '../../test-data/booking.test-data';

describe('Booking API: Given the Restful Booker API is available', { testIsolation: false }, () => {
  let bookingId = null;

  context.skip('Auth Negative: Generate token with invalid credentials', () => {
    it.skip('POST.Negative: Should return 401 when password is invalid', () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/21
      cy.getTokenNegative();
    });
  });

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
    it('GET: Then it should return 200 and an array', () => {
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
          response.body.slice(0, 3).forEach((b) => {
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
          response.body.slice(0, 3).forEach((b) => {
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
    BookingUpdate.forEach(({ field, value }) => {
      it(`Booking PATCH: Then it should update the "${field}" and return 200`, () => {
        const patchBody = field === 'bookingdates' ? { bookingdates: value } : { [field]: value };
        cy.updateBooking(bookingId, patchBody).then((response) => {
          expect(response.status).to.eq(200);
          if (field === 'bookingdates') {
            expect(response.body.bookingdates.checkin).to.eq(value.checkin);
            expect(response.body.bookingdates.checkout).to.eq(value.checkout);
          } else {
            expect(response.body[field]).to.eq(value);
          }
        });
      });
    });
  });

  context('Booking GET by ID: Verify all updated fields', () => {
    it('GET by ID: Then itshould return all updated fields', () => {
      cy.getBookingById(bookingId).then((response) => {
        expect(response.status).to.eq(200);
        BookingUpdate.forEach(({ field, value }) => {
          if (field === 'bookingdates') {
            expect(response.body.bookingdates.checkin).to.eq(value.checkin);
            expect(response.body.bookingdates.checkout).to.eq(value.checkout);
          } else {
            expect(response.body[field]).to.eq(value);
          }
        });
      });
    });
  });

  context.skip('Booking PATCH Negative: When updating with empty required fields', () => {
    mandatoryFields.forEach(({ field, data, error }) => {
      it.skip(`PATCH Negative: Then it should not update when ${field} is empty`, () => {
        //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/20
        cy.updateBooking(bookingId, data, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(error);
        });
      });
    });
  });

  context.skip('PATCH.Negative: When updating with check-in later than checkout', () => {
    it.skip('PATCH.Negative: Then it should not update when checkin is later than checkout', () => {
      const patchBody = { bookingdates: { checkin: TestDates.futureCheckout, checkout: TestDates.futureCheckin } };
      cy.updateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkinAfterCheckout);
      });
    });
  });

  context.skip('PATCH.Negative: When updating with check-in in the past', () => {
    it.skip('PATCH.Negative: Then it should not update when checkin is in the past', () => {
      const patchBody = { bookingdates: { checkin: TestDates.pastCheckin } };
      cy.updateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkinInPast);
      });
    });
  });

  context.skip('PATCH.Negative: When updating with check-in equal to checkout', () => {
    it.skip('PATCH.Negative: Then it should not update when checkin equals checkout', () => {
      const patchBody = { bookingdates: { checkin: TestDates.sameDate, checkout: TestDates.sameDate } };
      cy.updateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.checkinAfterCheckout);
      });
    });
  });

  context.skip('PATCH.Negative: When updating with invalid date format', () => {
    it.skip('PATCH.Negative: Then it should not update when date format is invalid', () => {
      const patchBody = { bookingdates: { checkin: TestDates.invalidFormat } };
      cy.updateBooking(bookingId, patchBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiBooking.errors.invalidDateFormat);
      });
    });
  });

  context('Booking DELETE: When deleting a booking', () => {
    it('DELETE: Then it should return 201', () => {
      cy.deleteBooking(bookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
    it('GET: Then it should return 404', () => {
      cy.getBookingById(bookingId).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
