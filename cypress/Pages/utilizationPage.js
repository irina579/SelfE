const new_dashboardPage = require("./new_dashboardPage");
class utilizationPage {
    elements = {
        utilizationLabel: () => cy.contains('h1','Utilization'),
        projectUtilizationLabel:()=> cy.get('.table').contains('td', 'Project Utilization'),
        projectUtilizationPercent:()=> cy.get('.table').contains('td', 'Project Utilization').next('td'),
    };

    navigateToUtilizationReport() {
        new_dashboardPage.elements.reportsMenu().click()
        new_dashboardPage.elements.utilizationItem().click()
    };
    validateContentExists() {
        this.elements.utilizationLabel().should('be.visible');
        this.elements.projectUtilizationLabel().should('be.visible');
        this.elements.projectUtilizationPercent().should('not.be.empty');
    };
}

module.exports = new utilizationPage();