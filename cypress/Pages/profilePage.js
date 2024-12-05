const homePage = require("./homePage");

class profilePage {
    elements = {
        salaryPlanLabel: () => cy.findByText('Salary plan'),
        generalInfoLabel: ()=>cy.findByText('General Info'),
        salaryReportLabel: ()=>cy.findByText('My salary report sheet (is not final financial information)*'),
    };

    navigateToProfile() {
        homePage.elements.additionalMenu().click()
        homePage.elements.profileDropdown().click()
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

module.exports = new profilePage();