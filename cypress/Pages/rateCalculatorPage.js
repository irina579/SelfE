const new_dashboardPage = require("./new_dashboardPage");
const zero_rate = Cypress.env('zero_rate_1000');
class rateCalculatorPage {
    elements = {
        rateCalculatorLabel: () => cy.contains('div','Overarching Settings'),
        salaryField: ()=>cy.contains('td','Salary').next('td').eq(0).find('input'),
        zeroRateLabel: ()=>cy.contains('div','Zero Rate:').next().eq(0),
        employeePlaceHolder: (employee)=>cy.contains('span', employee),
        employeeDropdownItem:(employee)=>cy.contains('.vs__dropdown-option', employee),
    };

    navigateToRateCalculatorPage() {
        new_dashboardPage.elements.rateCalculatorMenu().click(),
        this.elements.rateCalculatorLabel().should('be.visible')
    };
    validateSalaryUpdate() {
        this.elements.salaryField().clear()
        .should('have.value','')
        .type('1000')
        .should('have.value','1000'),
        this.elements.zeroRateLabel().should('have.text',zero_rate)
    };
    validateEmployeesSalaryFilled() {
        this.elements.employeePlaceHolder('Custom Employee').click()
        const employees = Cypress.env('employees');
        employees.forEach((employee) => {
            this.elements.employeeDropdownItem(employee.name).scrollIntoView().should('exist').click(); 
            this.elements.employeePlaceHolder(employee.name).scrollIntoView().should('exist').click();
            this.elements.zeroRateLabel().invoke('text') // Extract the text content
            .then((text) => parseInt(text, 10)) // Convert the text to a number
            .should('be.gt', zero_rate);
        });
    };
}

module.exports = new rateCalculatorPage();