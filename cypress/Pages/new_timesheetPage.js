const new_dashboardPage = require("./new_dashboardPage");
class new_timesheetPage {
    elements = {
        timesheetLabel: () => cy.contains('h1', 'Timesheet Reports'),
        teamMemberLabel: () => cy.contains('h3', 'Team Members'),
        searchTeamMemberInput: () => cy.get('input[placeholder="Search team members..."]'),
        monthButton: () => cy.contains('button', 'Custom').prev(), //for custom check

        
        //userListLabel: () => cy.get('.list-group-item'),
        //pieLabel: ()=>cy.get('.rate-value'),
        userRowLabel: ()=>cy.get('tr.local-striped'),
        pieText: ()=>cy.get('tspan'),
        employeeItem: (employee) => cy.contains('.p-3',employee),
    };

    getEmployees() {
        return Cypress.env('employees') || [];
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
        const employees = this.getEmployees();
        const dayOfMonth = new Date().getDate();
        employees.forEach((employee) => {
            if (dayOfMonth>6)
            this.elements.monthButton().click();
            else
            this.elements.monthButton().prev().click();
            this.elements.employeeItem(employee.name).scrollIntoView().click(); // Replaced direct `cy.contains`
            this.elements.userRowLabel().eq(0).should('contain.text', employee.name);
            this.elements.userRowLabel().last().should('contain.text', employee.name);
            this.elements.pieText().first().should('not.have.text', '0h');
        });
    };
    CheckNonBillableTypes(nonBillableTypes) {
        const employees = this.getEmployees();

        // Visiting the timesheet page
        cy.visit('https://aim.belitsoft.com/reports/timesheet');
          
        // Initialize an array for failures
        let Failors = [];
          
        // Iterate through the employees array and click on each employee's list item
        employees.forEach((employee) => {
            this.elements.employeeItem(employee.name).scrollIntoView().click();

            cy.scrollUntilElementsStopIncreasing('tbody', 'tr'); // loading virtual list

            // Check if any of the non-billable text types are present in the table body
            cy.get('tbody').then(($tbody) => {
                const tbodyText = $tbody.text();
                cy.log(tbodyText);
                const foundNonBillableTypes = [];

                // Iterate over nonBillableTypes and find those present in the table text
                nonBillableTypes.forEach((type) => {
                    if (tbodyText.includes(type)) {
                        foundNonBillableTypes.push(type);
                    }
                });

                // Log the specific types found for the current employee
                if (foundNonBillableTypes.length > 0) {
                    Failors.push(`${employee.name}: ${foundNonBillableTypes.join(', ')}`);
                }
            });
        });

        // After all the employees are processed
        cy.then(() => {
            if (Failors.length > 0) {
                // Log all failures
                cy.log('Failures:', Failors);

                // Write failures to a file in one go
                const dataString = Failors.join('\n');
                cy.writeFile('cypress/fixtures/types_incorrect.txt', dataString).then(() => {
                    cy.readFile('cypress/fixtures/types_incorrect.txt').then((data) => {
                        expect(Failors.length).to.be.lte(
                            0,
                            `Custom Error: Some employees have non-billable hours type: \n${data}`,
                        );
                    });
                });
            } else {
                cy.log('All employees have passed the verification.');
            }
        });
    };
}

module.exports = new new_timesheetPage();