const homePage = require("./homePage");
class projectsPage {
    elements = {
        projectItem: (project) => cy.contains('.sticky-column', project),
    };

    navigateToProjectsPage() {
        homePage.elements.projectsMenu().click()
        homePage.elements.managementItem().click()
    };
    validateContentExists() {
        const projects = Cypress.env('projects');
        projects.forEach((project) => {
            this.elements.projectItem(project).scrollIntoView().should('exist'); 
        });
    };
}

module.exports = new projectsPage();