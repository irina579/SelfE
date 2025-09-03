const homePage = require("./homePage");
const employees = Cypress.env('employees');
//const za_mes = Cypress.env('za_mes');
class salaryPage {
    elements = {
        employeeItem: (employee) => cy.contains('.fw-bold', employee),
        sumItem:(employee, line)=>cy.contains('td a',employee).parent().parent().parent().siblings().eq(line).find('td').eq(3)

    };

    navigateToSalaryPage() {
        homePage.elements.cfrManagementMenu().click()
        homePage.elements.salariesItem().click()
    };
    validateContentExists() {
        employees.forEach((employee) => {
            this.elements.employeeItem(employee.eng_name).scrollIntoView().should('exist'); 

        });
    };
    validateSumCorrect() {
        employees.forEach((employee) => {
          const expectedSum = employee.za_mes;
          this.elements
              .sumItem(employee.eng_name, employee.line ? employee.line : 0)
              .scrollIntoView()
              .should('have.text', expectedSum);
        });
      };
}

module.exports = new salaryPage();