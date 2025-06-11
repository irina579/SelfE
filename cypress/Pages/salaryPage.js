const homePage = require("./homePage");
const employees = Cypress.env('employees_eng');
const za_mes = Cypress.env('za_mes');
class salaryPage {
    elements = {
        employeeItem: (employee) => cy.contains('.fw-bold', employee),
        sumItemCustom:(employee)=>cy.contains('td a',employee).parent().parent().parent().siblings().eq(1).find('td').eq(3),
        sumItem:(employee)=>cy.contains('td a',employee).parent().parent().parent().siblings().eq(0).find('td').eq(3)

    };

    navigateToSalaryPage() {
        homePage.elements.cfrManagementMenu().click()
        homePage.elements.salariesItem().click()
    };
    validateContentExists() {
        employees.forEach((employee) => {
            this.elements.employeeItem(employee).scrollIntoView().should('exist'); 

        });
    };
    validateSumCorrect() {
        employees.forEach((employee, index) => {
            if (index === 0 || index === 8)  {
                // Handle the exception for employee[0]
                this.elements.sumItemCustom(employee).scrollIntoView().should('have.text',za_mes[index]);
            } else {
                // Default check for all other employees
                this.elements.sumItem(employee).scrollIntoView().scrollIntoView().should('have.text',za_mes[index]);
            }
        });
    };
}

module.exports = new salaryPage();