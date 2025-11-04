const new_dashboardPage = require("./new_dashboardPage");
const pool_count= Cypress.env('employees').length+1; //kate Zh. is missing in config since on Maternitery leave 
class new_contractsPage {
    elements = {
        poolCounter:()=>cy.contains('p', 'Active Contracts').next('div').find('p').first(),       
        employeeItem: (employee) => cy.contains('h3', employee),
        searchField:()=> cy.findByPlaceholderText('Search by name...'),
        filterField:()=>cy.contains('.multiselect__placeholder', 'Select types...'),
        filterDropdown:(filter)=>cy.contains('li>span',filter),
        employeeRow:(employee)=>cy.contains('h3',employee),
        clearAllFilters:()=>cy.contains('button', 'Clear All'),
    };

    navigateToContractsPage() {
        new_dashboardPage.elements.cfrManagementMenu().click()
        new_dashboardPage.elements.contractsItem().click()
    };
    validateContentExists() {
        this.elements.poolCounter().should('have.text', pool_count)
        const employees = Cypress.env('employees');
        employees.forEach((employee) => {
            this.elements.employeeItem(employee.name).scrollIntoView().should('exist'); 
        });
    };
    searchCheck(search_employee,notsearch_employee){
        this.elements.searchField().clear().type(search_employee);
        this.elements.employeeRow(search_employee).should('be.visible');
        this.elements.employeeRow(notsearch_employee).should('not.exist');
        this.elements.poolCounter().should('have.text', 1)
    }
    validateFilterAndSearchWorks(search_employee,notsearch_employee,contractor,non_contractor){
        this.searchCheck(search_employee,notsearch_employee);
        this.elements.clearAllFilters().click();
        this.elements.filterField().click();
        this.elements.filterDropdown('Contractor').click();
        this.elements.searchField().clear();
        this.elements.employeeRow(contractor).should('be.visible');
        this.elements.employeeRow(non_contractor).should('not.exist');
        this.searchCheck(contractor,non_contractor)
    }
}

module.exports = new new_contractsPage();