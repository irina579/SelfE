const new_dashboardPage = require("./new_dashboardPage");
const employees = Cypress.env('employees');
//const za_mes = Cypress.env('za_mes');
class salaryPage {
    elements = {
        employeeItem: (employee) => cy.contains('a', employee),
        sumItem: (employee) => cy.contains('td a',employee).closest('tr').find('td').eq(1).find('.text-sm.font-bold.text-gray-900')
        
        //sumItem:(employee, line)=>cy.contains('td a',employee).parent().parent().parent().siblings().eq(line).find('td').eq(3)

    };

    navigateToSalaryPage() {
        new_dashboardPage.elements.cfrManagementMenu().click()
        new_dashboardPage.elements.salariesItem().click()
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
              .sumItem(employee.eng_name)
              .scrollIntoView()
              .should('have.text', expectedSum);
        });
      };
}

module.exports = new salaryPage();