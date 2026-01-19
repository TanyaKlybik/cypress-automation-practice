import { testData } from '../../test-data/booking.test-data';

describe(`RestfulBooker API: Given the Restful Booker API is available`, { testIsolation: false }, () => {
  let adminToken;

  before(() => {
    cy.restfullBooker__getAuthToken__POST(userRoles.API_ADMIN).then((token) => {
      adminToken = token;
    });
  });

  context(`RestfullBooker__POST: When creating a new booking`, () => {
    it(`RestfullBooker__POST: Then it should return 200 and booking id`, () => {
      cy.restfullBooker__createBooking__POST(testData.restfulBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        testData.bookingId = response.body.bookingid;
      });
    });
  });

  context.skip(`RestfullBooker__POST: When creating a new booking with at least 1 empty mandatory field`, () => {
    //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/16
    let randomField; 
    before(() => {
      cy.restfullBooker__getRandomMandatoryField__GET().then((field) => {
        randomField = field;
        cy.log(`Selected random mandatory field: ${randomField}`);
      });
    });
    it.skip(`RestfullBooker__POST: Then it should fail without creating the booking because the field is empty and return 500`, () => {
      cy.restfullBooker__prepareBookingWithEmptyField__GET(randomField).then((bookingData) => {
        cy.restfullBooker__createBooking__POST(bookingData, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
        });
      });
    });
  });

  context.skip(`RestfullBooker__POST: When creating a new booking with invalid price format`, () => {
    it.skip(`RestfullBooker__POST: Then it should fail without creating the booking because of invalid price format`, () => {
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('invalidPriceType')
      .then((bookingData) => {
        cy.restfullBooker__createBooking__POST(bookingData, { failOnStatusCode: false })
          .then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
          });
        });
    });
  }); 

  context.skip(`RestfullBooker__POST: When creating a new booking when checkin is later than checkout`, () => {
    it.skip(`RestfullBooker__POST: Then it should fail without creating the booking because checkin is later than checkout`, () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('checkInAfterCheckOut')
      .then((bookingData) => {
        cy.restfullBooker__createBooking__POST(bookingData, { failOnStatusCode: false })
          .then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
          });
       });
    });
  });

  context.skip(`RestfullBooker__POST: When creating a new booking when checkin equals checkout`, () => {
    it.skip(`RestfullBooker__POST:Then it should fail without creating the booking because checkin equals checkout`, () => {
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('checkInEqualToCheckOut')
      .then((bookingData) => {
        cy.restfullBooker__createBooking__POST(bookingData, { failOnStatusCode: false })
          .then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkInEqualToCheckOut);
          });
       });
    });
  });

  context.skip(`RestfullBooker__POST: When creating a new booking when checkin is in the past`, () => {
    it.skip(`RestfullBooker__POST: Then it should fail without creating the booking because checkin is in the past`, () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/17
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('checkInInPast')
      .then((bookingData) => {
        cy.restfullBooker__createBooking__POST(bookingData, { failOnStatusCode: false })
          .then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinInPast);
        });
      });
    });
  });

  context.skip(`RestfullBooker__POST: When creating a new booking with invalid date format`, () => {
    it.skip(`RestfullBooker__POST: Then it should fail without creating the booking because of invalid date format`, () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/18
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('invalidDateFormat')
      .then((bookingData) => {
        cy.restfullBooker__createBooking__POST(bookingData, { failOnStatusCode: false })
          .then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinInPast);
        });
      });
    });
  });

  context.skip(`RestfullBooker__POST: When generate token with invalid credentials`, () => {
    it.skip(`RestfullBooker__POST: Then it should fail and shouldn't have a token`, () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/21
      cy.getUserDataByRole(userRoles.API_ADMIN).then((user) => {
        cy.request({
          method: 'POST',
          url: urls.apiAuth,
          body: {
          username: user.username,
          password: user.wrongPassword
          },
        }).then((res) => {
          expect(res.status).to.eq(401);
          expect(res.body).not.to.have.property('token');
        });
      });
    });
  });

  context(`RestfullBooker__GET: When requesting all bookings`, () => {
    it(`RestfullBooker__GET: Then it should return 200 and an array`, () => {
      cy.restfullBooker__getAllBookings__GET().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context(`RestfullBooker__GETbyId: When requesting booking by id`, () => {
    it(`RestfullBooker__GETbyId: Then it should return 200 and booking details`, () => {
      cy.restfullBooker__getAllBookingsById__GET(testData.bookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(testData.restfulBooking.firstname);
        expect(response.body.lastname).to.eq(testData.restfulBooking.lastname);
      });
    });
  });

  context(`RestfullBooker__GET: When searching bookings by name by firstname/lastname`, () => {
    it(`RestfullBooker__GET: Then it should return bookings filtered by firstname`, () => {
      cy.restfullBooker__getAllBookingsByFilter__GET({ firstname: testData.restfulBooking.firstname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
    it(`RestfullBooker__GET: Then it should return bookings filtered by lastname`, () => {
      cy.restfullBooker__getAllBookingsByFilter__GET({ lastname: testData.restfulBooking.lastname }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context(`RestfullBooker__GET:: When searching bookings by reservation dates(checkin/checkout)`, () => {
    it.skip(`RestfullBooker__GET: Then it should return bookings filtered by checkin`, () => {
      //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/19
      cy.restfullBooker__getAllBookingsByFilter__GET({ checkin: testData.restfulBooking.bookingdates.checkin }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
    it(`RestfullBooker__GET: Then it should return bookings filtered by checkout`, () => {
      cy.restfullBooker__getAllBookingsByFilter__GET({ checkout: testData.restfulBooking.bookingdates.checkout }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  });

  context(`RestfullBooker__PATCH: When updating booking data`, () => {
    let patchBody;
    let randomField;
    before(() => {
      cy.restfullBooker__getRandomBookingUpdateField__GET().then(({ field, value }) => {
        randomField = field;  
        patchBody = field === 'bookingdates' ? { bookingdates: value } : { [field]: value };
        cy.log(`Updated random field: ${randomField}`);
      });
    });
    it(`RestfullBooker__PATCH: Then it should update the random field and return 200`, () => {
      cy.restfullBooker__updateBooking__PATCH(adminToken, testData.bookingId, patchBody).then((response) => {
        expect(response.status).to.eq(200);
        if (randomField === 'bookingdates') {
          expect(response.body.bookingdates.checkin).to.eq(patchBody.bookingdates.checkin);
          expect(response.body.bookingdates.checkout).to.eq(patchBody.bookingdates.checkout);
        } else {
          expect(response.body[randomField]).to.eq(patchBody[randomField]);
        }
      });
    });
  });

  context.skip(`RestfullBooker__PATCH: When updating with empty required fields`, () => {
    //   TODO: https://github.com/TanyaKlybik/cypress-automation-practice/issues/20
    let randomField;
    before(() => {
      cy.restfullBooker__getRandomMandatoryField__GET().then((field) => {
        randomField = field;
      });
        cy.log(`Selected random mandatory field: ${randomField}`);
      });
    it.skip(`RestfullBooker__PATCH: Then it should fail with random empty mandatory`, () => {
       cy.restfullBooker__prepareBookingWithEmptyField__GET(randomField).then((bookingData) => {
        cy.restfullBooker__updateBooking__PATCH(adminToken, testData.bookingId, bookingData, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(l10n.apiRestfulBooking.errors.internalServerError);
          });
        });
     });
   });

  context.skip(`RestfullBooker__PATCH: When updating with check-in later than checkout`, () => {
    it.skip(`RestfullBooker__PATCH: Then it should fail when checkin is later than checkout`, () => {
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('checkInAfterCheckOut').then((bookingData) => {
       cy.restfullBooker__updateBooking__PATCH(adminToken, testData.bookingId, bookingData, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
        });
      });
    });
  });

  context.skip(`RestfullBooker__PATCH: When updating with check-in in the past`, () => {
    it.skip(`RestfullBooker__PATCH: Then it should fail when checkin is in the past`, () => {
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('checkInInPast').then((bookingData) => {
        cy.restfullBooker__updateBooking__PATCH(adminToken, testData.bookingId, bookingData, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinInPast);
        });
       });
    });
  });

  context.skip(`RestfullBooker__PATCH: When updating with check-in equal to checkout`, () => {
    it.skip(`RestfullBooker__PATCH: Then it should fail when checkin equals checkout`, () => {
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('checkInEqualToCheckOut').then((bookingData) => {
        cy.restfullBooker__updateBooking__PATCH(adminToken, testData.bookingId, bookingData, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(l10n.apiRestfulBooking.errors.checkinAfterCheckout);
        });
      });
    });
  });

  context.skip(`RestfullBooker__PATCH: When updating with invalid date format`, () => {
    it.skip(`RestfullBooker__PATCH: Then it should fail when date format is invalid`, () => {
      cy.restfullBooker__prepareBookingWithUpdatedItem__GET('invalidDateFormat').then((bookingData) => {
        cy.restfullBooker__updateBooking__PATCH(adminToken, testData.bookingId, bookingData, { failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq(l10n.apiRestfulBooking.errors.invalidDateFormat);
        });
      });
    });
  });

  context(`RestfullBooker__DELETE: When deleting the booking`, () => {
    it(`RestfullBooker__DELETE: Then it should return 201`, () => {
      cy.restfullBooker__deleteBooking__DELETE(adminToken, testData.bookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
});
