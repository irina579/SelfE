const new_dashboardPage = require("./new_dashboardPage");
class problemsInReportedHoursPage {
    elements = {
        problemsInReportedHoursLabel: () => cy.contains('h1','Problems in reported hours'),
        periodLabel: () => cy.findByText('Period'),
        problemRow: () => cy.get('tbody tr'),
    };

    navigateToProblemsInReportedHoursPage() {
        cy.intercept('https://aim.belitsoft.com/api/problems-in-reported-hours').as('grid_list');
        new_dashboardPage.elements.reportsMenu().click()
        new_dashboardPage.elements.problemsInReportedHoursItem().click()

    };
    validateContentExists() {
        cy.wait('@grid_list').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        this.elements.problemsInReportedHoursLabel().should('be.visible');
        this.elements.periodLabel().scrollIntoView().should('be.visible');
    };
    checkThereAreNoProblemsEOMonth(){
        const currentDate = new Date();
        const dayOfMonth = currentDate.getDate();
        if (dayOfMonth >= 30) {
            this.elements.problemRow().should('not.exist');
          }
    };
}

module.exports = new problemsInReportedHoursPage();