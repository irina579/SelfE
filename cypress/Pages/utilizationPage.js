const homePage = require("./homePage");
class utilizationPage {
    elements = {
        utilizationLabel: () => cy.contains('h1','Utilization'),
        noventiqLabel: () => cy.findByText('Noventiq Digital'),
        projectUtilizationLabel:()=> cy.get('.table').contains('td', 'Project Utilization'),
        projectUtilizationPercent:()=> cy.get('.table').contains('td', 'Project Utilization').next('td'),
    };

    navigateToUtilizationReport() {
        homePage.elements.reportsMenu().click()
        homePage.elements.utilizationItem().click()
    };
    validateContentExists() {
        this.elements.utilizationLabel().should('be.visible');
        this.elements.noventiqLabel().should('be.visible');
        this.elements.projectUtilizationLabel().should('be.visible');
        this.elements.projectUtilizationPercent().should('not.be.empty');
    };
}

module.exports = new utilizationPage();