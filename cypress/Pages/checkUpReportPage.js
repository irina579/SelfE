const new_dashboardPage = require("./new_dashboardPage");

class checkUpReportPage {
    elements = {
        header: () => cy.contains('h1','Checkup Report'),
    };

    navigateToCheckUpReport() {
        new_dashboardPage.elements.projectsMenu().click();
        new_dashboardPage.elements.checkupReportItem().click();
    };

    validateOpened() {
        this.elements.header().should('exist');
        cy.url().should('include', '/checkup-report');
    };
}

module.exports = new checkUpReportPage();