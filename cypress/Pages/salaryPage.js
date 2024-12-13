const homePage = require("./homePage");
class salaryPage {
    elements = {
        employeeItem: (employee) => cy.contains('.fw-bold', employee),
    };

    navigateToSalaryPage() {
        homePage.elements.cfrManagementMenu().click()
        homePage.elements.salariesItem().click()
    };
    validateContentExists() {
        const employees = Cypress.env('employees_eng');
        employees.forEach((employee) => {
            this.elements.employeeItem(employee).scrollIntoView().should('exist'); 

        });
    };
}

module.exports = new salaryPage();