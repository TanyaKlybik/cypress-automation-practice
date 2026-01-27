export const testData = {
  bookingId: '',
  restfulBooking: {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 120,
    depositpaid: true,
    bookingdates: {
      checkin: '2027-01-01',
      checkout: '2027-01-10',
    },
    additionalneeds: 'Breakfast',
  },
  restfulMandatoryFields: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'checkin', 'checkout'],
  updatedItems: {
    invalidPriceType: 'abc',
    invalidDepositType: 'true',
    checkInAfterCheckOut: {
      checkin: '2026-12-10',
      checkout: '2026-12-01',
    },
    checkInEqualToCheckOut: {
      checkin: '2026-12-01',
      checkout: '2026-12-01',
    },
    checkInInPast: {
      checkin: '1999-01-01',
      checkout: '2025-12-01',
    },
    invalidDateFormat: {
      checkin: '01/01/2025',
      checkout: '01/05/2025',
    },
  },
  restfulBookingUpdate: [
    { field: 'firstname', value: 'Mark' },
    { field: 'lastname', value: 'Claire' },
    { field: 'totalprice', value: 555 },
    { field: 'depositpaid', value: false },
    {
      field: 'bookingdates',
      value: { checkin: '2030-01-01', checkout: '2030-01-10' },
    },
    { field: 'additionalneeds', value: 'Late Checkout' },
  ],
};
