describe('Remove assigments', () => { //temporary script to remove unnecessary assigments
    let employees = Cypress.env('employees');
    let manual_hours_check = Cypress.env('manual_hours_check');
    const currentDate = new Date();
    const project_link= 'https://aim.belitsoft.com/projects/504';
    const assigments_length = 20;

    before(() => {
        Cypress.session.clearAllSavedSessions();
    });

    beforeEach(() => {
      cy.Login();
      cy.viewport(1920, 1080);
    });   

  it("Remove N/A assigments", { tags: ['smoke'] }, () => {
    cy.visit(project_link)  
    for (let i = 0; i < assigments_length; i++) {
      cy.get ('[title="Edit Assignment"]').eq(0).click()  
      cy.get('.modal-dialog').find('[type="date"]').eq(0).type('2024-01-01');
      cy.get('.modal-dialog').find('[type="date"]').eq(1).type('2024-01-01');
      cy.contains('label', 'FTE').next('input').clear().type('0');
  }



    

  });
});  