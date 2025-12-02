import { Booking, BookingUpdate } from '../../test-data/booking.test-data';

describe('Booking API: Given the Restful Booker API is available', { testIsolation: false }, () => {
  let bookingId = null;

  context('Booking POST: When creating a new booking', () => {
    it('Booking POST: Then it should return 200 and booking id', () => {
      cy.createBooking(Booking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        bookingId = response.body.bookingid;
      });
    });
  });

  context('Booking GET: When requesting all bookings', () => {
    it('Booking GET: Then it should return 200 and an array', () => {
      cy.getAllBookings().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
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

  context('Booking PATCH: When updating booking data', () => {
    it('Booking PATCH: Then it should update the booking and return 200', () => {
      cy.updateBooking(bookingId, BookingUpdate).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(BookingUpdate.firstname);
      });
    });
  });
});
