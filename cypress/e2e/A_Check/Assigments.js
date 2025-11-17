describe('Remove assigments', () => {
    let employees = Cypress.env('employees');
    let manual_hours_check = Cypress.env('manual_hours_check');
    const currentDate = new Date();
    const project_link= 'https://aim.belitsoft.com/projects/1972';
    let nonBillableTypes = [];

    before(() => {
        Cypress.session.clearAllSavedSessions();
    });

    beforeEach(() => {
      cy.Login();
      cy.viewport(1920, 1080);
    });   

  it("Remove N/A assigments", { tags: ['smoke'] }, () => {
    cy.visit(project_link)
    cy.get ('[title="Edit Assignment"]').eq(0).click()
    cy.get('.modal-dialog').find('[type="date"]').eq(0).type('2024-01-01');
    cy.get('.modal-dialog').find('[type="date"]').eq(1).type('2024-01-01');
    cy.contains('label', 'FTE').next('input').type('0')
  });
});  