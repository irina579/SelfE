const homePage = require("./homePage");
const employees = Cypress.env('employees');
//const za_mes = Cypress.env('za_mes');
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
            this.elements.employeeItem(employee.eng_name).scrollIntoView().should('exist'); 

        });
    };
    validateSumCorrect() {
        employees.forEach((employee) => {
          const expectedSum = employee.za_mes;
          if (employee.eng_name === 'Bobrovskaya' || employee.eng_name === 'Parkhimovich') { //for employees with the info not in the 1-st line
            this.elements
              .sumItemCustom(employee.eng_name)
              .scrollIntoView()
              .should('have.text', expectedSum);
          } else {
            this.elements
              .sumItem(employee.eng_name)
              .scrollIntoView()
              .should('have.text', expectedSum);
          }
        });
      };
}

module.exports = new salaryPage();