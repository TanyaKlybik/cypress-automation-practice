describe('RestfulBooker.GET.ping: Given no preconditions', () => {
  context('RestfulBooker.GET.ping: When sending GET request to /ping endpoint', () => {
    it('RestfulBooker.GET.ping: Then it should return 201 status code', () => {
      cy.request({
        method: 'GET',
        url: urls.apiPing,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
});
