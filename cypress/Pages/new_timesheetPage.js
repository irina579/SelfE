const new_dashboardPage = require("./new_dashboardPage");
class new_timesheetPage {
    elements = {
        timesheetLabel: () => cy.contains('h1', 'Timesheet Reports'),
        teamMemberLabel: () => cy.contains('h3', 'Team Members'),
        searchTeamMemberInput: () => cy.get('input[placeholder="Search team members..."]'),

        
        //userListLabel: () => cy.get('.list-group-item'),
        //pieLabel: ()=>cy.get('.rate-value'),
        userRowLabel: ()=>cy.get('tr.local-striped'),
        pieText: ()=>cy.get('tspan'),
        employeeItem: (employee) => cy.contains('span', employee),
    };

    navigateToTimesheetReport() {
        new_dashboardPage.elements.reportsMenu().click()
        new_dashboardPage.elements.timeSheetItem().click()
    };
    validateContentExists() {
        this.elements.timesheetLabel().should('be.visible');
        this.elements.teamMemberLabel().should('be.visible');
        this.elements.searchTeamMemberInput().should('be.visible');
       // this.elements.userListLabel().should('have.length.greaterThan', 1);
       // this.elements.pieLabel().eq(0).should('be.visible');
       // this.elements.pieLabel().eq(1).should('be.visible');
       
    };
    validateEmployeesHoursAreVisible() {
        const employees = Cypress.env('employees');
        employees.forEach((employee) => {
            this.elements.employeeItem(employee.name).scrollIntoView().click(); // Replaced direct `cy.contains`
            this.elements.userRowLabel().eq(0).should('contain.text', employee.name);
            this.elements.userRowLabel().last().should('contain.text', employee.name);
            this.elements.pieText().first().should('not.have.text', '0h');
        });
    };
}

module.exports = new new_timesheetPage();