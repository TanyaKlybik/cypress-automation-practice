describe('GET ping: Given the API is available', () => {
  context('GET ping: When sending GET request to /ping endpoint', () => {
    it('GET ping: Then it should return 201 status code', () => {
      cy.request({
        method: 'GET',
        url: urls.apiPing,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
});
