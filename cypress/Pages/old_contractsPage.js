const homePage = require("./homePage");
const pool_count= Cypress.env('employees').length; 
class contractsPage {
    elements = {
        poolCounter:(pool_count)=>cy.contains('tr', 'QA Pool (' + pool_count + ')'),       
        employeeItem: (employee) => cy.contains('tr', employee),
        searchField:()=> cy.findByPlaceholderText('Search by employee name'),
        filterField:()=>cy.contains('.multiselect__placeholder','Type to search'),
        filterDropdown:(filter)=>cy.contains('li>span',filter),
        employeeRow:(employee)=>cy.contains('td',employee)
    };

    navigateToContractsPage() {
        homePage.elements.cfrManagementMenu().click()
        homePage.elements.contractsItem().click()
    };
    validateContentExists() {
        this.elements.poolCounter(pool_count).should('exist')
        const employees = Cypress.env('employees');
        employees.forEach((employee) => {
            this.elements.employeeItem(employee.name).scrollIntoView().should('exist'); 
        });
    };
    searchCheck(search_employee,notsearch_employee){
        this.elements.searchField().clear().type(search_employee);
        this.elements.employeeRow(search_employee).should('be.visible');
        this.elements.employeeRow(notsearch_employee).should('not.be.visible');
        cy.contains('tr', 'QA Pool (1)').should('exist');
    }
    validateFilterAndSearchWorks(search_employee,notsearch_employee,contractor,non_contractor){
        this.searchCheck(search_employee,notsearch_employee);
        this.elements.filterField().click();
        this.elements.filterDropdown('Contractor').click();
        this.elements.searchField().clear();
        this.elements.employeeRow(contractor).should('be.visible');
        this.elements.employeeRow(non_contractor).should('not.be.visible');
        this.searchCheck(contractor,non_contractor)
    }
}

module.exports = new contractsPage();