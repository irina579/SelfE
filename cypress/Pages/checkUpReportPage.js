const homePage = require("./homePage");

class checkUpReportPage {
    elements = {
        header: () => cy.contains('h1','Checkup Report'),
    };

    navigateToCheckUpReport() {
        homePage.elements.projectsMenu().click();
        homePage.elements.checkupReportItem().click();
    };

    validateOpened() {
        this.elements.header().should('exist');
        cy.url().should('include', '/checkup-report');
    };
}

module.exports = new checkUpReportPage();