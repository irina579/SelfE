const new_dashboardPage = require("./new_dashboardPage");
class projectsPage {
    elements = {
        projectItem: (project) => cy.contains('.table-row', project),
        filterButton:() => cy.contains('button', 'Advanced Filters'),
        statusField:() => cy.contains('label', 'Status').next('.input-field'),
    };

    navigateToProjectsPage() {
        cy.wait(1000);
        new_dashboardPage.elements.projectsMenu().click()
        new_dashboardPage.elements.managementItem().click()
    };
    validateContentExists() {
        const projects = Cypress.env('projects');
        this.elements.filterButton().click();
        this.elements.statusField().select('All Statuses');
        projects.forEach((project) => {
            this.elements.projectItem(project).scrollIntoView().should('exist'); 
        });
    };
}

module.exports = new projectsPage();