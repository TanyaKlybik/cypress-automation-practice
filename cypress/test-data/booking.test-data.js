const testUserData =  {
  firstname: 'John',
    lastname: 'Doe',
    totalprice: 120,
    depositpaid: true,
    bookingdates: {
    checkin: '2027-01-01',
      checkout: '2027-01-10',
  },
  additionalneeds: 'Breakfast',
};

export const testData = {
  updatedItems: {
    checkInEqualToCheckout: {

    }
  },
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
  restfulTestDates: {
    futureCheckin: '2030-01-01',
    futureCheckout: '2030-01-10',
    pastCheckin: '2010-01-01',
    sameDate: '2030-01-01',
    invalidFormat: '01/01/2030',
  },
  restfulBookingNegative : {
    EmptyFirstname: { ...testUserData, firstname: '' },
    EmptyLastname: { ...testUserData, lastname: '' },
    EmptyTotalPrice: { ...testUserData, totalprice: null },
    EmptyDepositPaid: { ...testUserData, depositpaid: null },
    EmptyCheckin: { ...testUserData, bookingdates: { checkin: '', checkout: testUserData.bookingdates.checkout } },
    EmptyCheckout: { ...testUserData, bookingdates: { checkin: testUserData.bookingdates.checkin, checkout: '' } },
    InvalidPriceType: { ...testUserData, totalprice: 'abc' },
    InvalidDepositType: { ...testUserData, depositpaid: 'true' },
    CheckinAfterCheckout: { ...testUserData, bookingdates: { checkin: '2025-12-10', checkout: '2025-12-01' } },
    CheckinEqualCheckout: { ...testUserData, bookingdates: { checkin: '2025-12-01', checkout: '2025-12-01' } },
    CheckinInPast: { ...testUserData, bookingdates: { checkin: '1999-01-01', checkout: '2025-12-01' } },
    InvalidDateFormat: { ...testUserData, bookingdates: { checkin: '01/01/2025', checkout: '01/05/2025' } },
  }
};


// export const RestfulMandatoryFields = [
//   { field: 'firstname', data: RestfulBookingNegative.EmptyFirstname },
//   { field: 'lastname', data: RestfulBookingNegative.EmptyLastname },
//   { field: 'totalprice', data: RestfulBookingNegative.EmptyTotalPrice },
//   { field: 'depositpaid', data: RestfulBookingNegative.EmptyDepositPaid },
//   { field: 'checkin', data: RestfulBookingNegative.EmptyCheckin },
//   { field: 'checkout', data: RestfulBookingNegative.EmptyCheckout },
// ];
