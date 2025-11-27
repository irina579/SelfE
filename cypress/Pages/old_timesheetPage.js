const homePage = require("./homePage");
class timesheetPage {
    elements = {
        userListLabel: () => cy.get('.list-group-item'),
        pieLabel: ()=>cy.get('.pie'),
        userRowLabel: ()=>cy.get('[data-bs-toggle="popover"]'),
        pieText: ()=>cy.get('.pie>text'),
        employeeItem: (employee) => cy.contains('.list-group-item', employee),
    };

    navigateToTimesheetReport() {
        homePage.elements.reportsMenu().click()
        homePage.elements.timeSheetItem().click()
    };
    validateContentExists() {
        this.elements.userListLabel().should('have.length.greaterThan', 1);
        this.elements.pieLabel().eq(0).should('be.visible');
        this.elements.pieLabel().eq(1).should('be.visible');
    };
    validateEmployeesHoursAreVisible() {
        const employees = Cypress.env('employees');
        employees.forEach((employee) => {
            this.elements.employeeItem(employee.name).scrollIntoView().click(); // Replaced direct `cy.contains`
            this.elements.userRowLabel().eq(0).should('contain.text', employee.name);
            this.elements.userRowLabel().last().should('contain.text', employee.name);
            this.elements.pieText().eq(1).should('not.contain.text', '0%');
        });
    };
    
}

module.exports = new timesheetPage();