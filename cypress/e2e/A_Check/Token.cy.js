describe.skip('Refresh Access Token Test', () => {
    beforeEach(() => {
      // Perform login to ensure we are authenticated
      cy.Login(); // Assumes you have a `cy.Login()` custom command defined
      cy.viewport(1920, 1080); // Optional, set viewport size
    });
  
    it('Sends GET request to refresh-access-token endpoint', () => {
      // Send GET request to the refresh-access-token endpoint
      cy.request({
        method: 'GET',
        url: 'https://aim.belitsoft.com/api/refresh-access-token', // Replace with your endpoint
      }).then((response) => {
        // Log the response (for debugging purposes)
        cy.log('Response:', response);
  
        // Verify response status
        expect(response.status).to.eq(200);
  
        // Optionally verify response body structure or values
      //  expect(response.body).to.have.property('access_token'); // Example validation
      });
    });
    it('COMMAND: Sends GET request to refresh-access-token endpoint', () => {
    cy.RefreshToken()
      });
  });  