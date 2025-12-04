export const Booking = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 120,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-01-01',
    checkout: '2025-01-10',
  },
  additionalneeds: 'Breakfast',
};

export const BookingUpdate = {
  firstname: 'Johnny',
};

export const BookingNegative = {
  EmptyFirstname: { ...Booking, firstname: '' },
  EmptyLastname: { ...Booking, lastname: '' },
  EmptyTotalPrice: { ...Booking, totalprice: null },
  EmptyDepositPaid: { ...Booking, depositpaid: null },
  EmptyCheckin: { ...Booking, bookingdates: { checkin: '', checkout: Booking.bookingdates.checkout } },
  EmptyCheckout: { ...Booking, bookingdates: { checkin: Booking.bookingdates.checkin, checkout: '' } },
  InvalidPriceType: { ...Booking, totalprice: 'abc' },
  InvalidDepositType: { ...Booking, depositpaid: 'true' },
  CheckinAfterCheckout: { ...Booking, bookingdates: { checkin: '2025-12-10', checkout: '2025-12-01' } },
  CheckinEqualCheckout: { ...Booking, bookingdates: { checkin: '2025-12-01', checkout: '2025-12-01' } },
  CheckinInPast: { ...Booking, bookingdates: { checkin: '1999-01-01', checkout: '2025-12-01' } },
  InvalidDateFormat: { ...Booking, bookingdates: { checkin: '01/01/2025', checkout: '01/05/2025' } },
};

export const mandatoryFields = [
  { field: 'firstname', data: BookingNegative.EmptyFirstname, error: l10n.apiBooking.errors.firstnameIsRequired },
  { field: 'lastname', data: BookingNegative.EmptyLastname, error: l10n.apiBooking.errors.lastnameIsRequired },
  { field: 'totalprice', data: BookingNegative.EmptyTotalPrice, error: l10n.apiBooking.errors.totalpriceIsRequired },
  { field: 'depositpaid', data: BookingNegative.EmptyDepositPaid, error: l10n.apiBooking.errors.depositpaidIsRequired },
  { field: 'checkin', data: BookingNegative.EmptyCheckin, error: l10n.apiBooking.errors.checkinIsRequired },
  { field: 'checkout', data: BookingNegative.EmptyCheckout, error: l10n.apiBooking.errors.checkoutIsRequired },
];

export const nameFilters = [
  { field: 'firstname', value: Booking.firstname },
  { field: 'lastname', value: Booking.lastname },
];

export const dateFilters = [
  { field: 'checkin', value: Booking.bookingdates.checkin },
  { field: 'checkout', value: Booking.bookingdates.checkout },
];
