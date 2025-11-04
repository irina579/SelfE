const new_dashboardPage = require("./new_dashboardPage");

class new_profilePage {
    elements = {
        salaryPlanLabel: () => cy.findByText('Salary Plan'),
        generalInfoLabel: ()=>cy.findByText('General Info'),
        salaryReportLabel: ()=>cy.findByText('My salary report sheet (is not final financial information)*'),
    };

    navigateToProfile() {
        new_dashboardPage.elements.additionalMenu().click()
        new_dashboardPage.elements.profileDropdown().click()
    };
    validatePageLabelsAreVisible() {
        this.elements.salaryPlanLabel().should('be.visible');
        this.elements.generalInfoLabel().should('be.visible');
        this.elements.salaryReportLabel().should('be.visible');
    };
    validatePeriodIsCorrect() {
        const date = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        const result_date = date.toISOString().split('T')[0].substring(0, 7);
        cy.log(result_date);
        cy.contains('td', result_date).should('be.visible');
    };
}

module.exports = new new_profilePage();