export const RestfulBooking = {
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

export const RestfulBookingUpdate = [
  { field: 'firstname', value: 'Mark' },
  { field: 'lastname', value: 'Claire' },
  { field: 'totalprice', value: 555 },
  { field: 'depositpaid', value: false },
  {
    field: 'bookingdates',
    value: { checkin: '2030-01-01', checkout: '2030-01-10' },
  },
  { field: 'additionalneeds', value: 'Late Checkout' },
];

export const RestfulTestDates = {
  futureCheckin: '2030-01-01',
  futureCheckout: '2030-01-10',
  pastCheckin: '2010-01-01',
  sameDate: '2030-01-01',
  invalidFormat: '01/01/2030',
};

export const RestfulBookingNegative = {
  EmptyFirstname: { ...RestfulBooking, firstname: '' },
  EmptyLastname: { ...RestfulBooking, lastname: '' },
  EmptyTotalPrice: { ...RestfulBooking, totalprice: null },
  EmptyDepositPaid: { ...RestfulBooking, depositpaid: null },
  EmptyCheckin: { ...RestfulBooking, bookingdates: { checkin: '', checkout: RestfulBooking.bookingdates.checkout } },
  EmptyCheckout: { ...RestfulBooking, bookingdates: { checkin: RestfulBooking.bookingdates.checkin, checkout: '' } },
  InvalidPriceType: { ...RestfulBooking, totalprice: 'abc' },
  InvalidDepositType: { ...RestfulBooking, depositpaid: 'true' },
  CheckinAfterCheckout: { ...RestfulBooking, bookingdates: { checkin: '2025-12-10', checkout: '2025-12-01' } },
  CheckinEqualCheckout: { ...RestfulBooking, bookingdates: { checkin: '2025-12-01', checkout: '2025-12-01' } },
  CheckinInPast: { ...RestfulBooking, bookingdates: { checkin: '1999-01-01', checkout: '2025-12-01' } },
  InvalidDateFormat: { ...RestfulBooking, bookingdates: { checkin: '01/01/2025', checkout: '01/05/2025' } },
};

export const RestfulMandatoryFields = [
  { field: 'firstname', data: RestfulBookingNegative.EmptyFirstname},
  { field: 'lastname', data: RestfulBookingNegative.EmptyLastname},
  { field: 'totalprice', data: RestfulBookingNegative.EmptyTotalPrice},
  { field: 'depositpaid', data: RestfulBookingNegative.EmptyDepositPaid},
  { field: 'checkin', data: RestfulBookingNegative.EmptyCheckin},
  { field: 'checkout', data: RestfulBookingNegative.EmptyCheckout},
];

export const RestfulNameFilters = [
  { field: 'firstname', value: RestfulBooking.firstname },
  { field: 'lastname', value: RestfulBooking.lastname },
];

export const RestfulDateFilters = [
  { field: 'checkin', value: RestfulBooking.bookingdates.checkin },
  { field: 'checkout', value: RestfulBooking.bookingdates.checkout },
];
