class homePage {
    elements = {
        worktrackLabel: () => cy.findByText('Work Tracks'),
        utilizationLabel: ()=>cy.contains('h3', 'Utilization'),
        assigmentsLabel: ()=>cy.contains('h3','Assignments'),
        toDoLabel:()=>cy.findByText('Your Tasks'), //change naming
//left menu
        dashboardMenu: () => cy.contains('.sidebar-label', 'Dashboard'),
        finDepDocsMenu: () => cy.contains('.sidebar-label', 'FinDep Docs'),
        clientsMenu: () => cy.contains('.sidebar-label', 'Clients'),
        cfrManagementMenu: () => cy.contains('button', 'CFR Management'),
        groupsMenu: () => cy.contains('.sidebar-label', 'Groups'),
        rateCalculatorMenu: () => cy.contains('.sidebar-label', 'Rate calculator'),
        projectsMenu: () => cy.contains('.sidebar-label', 'Projects'),
        compensationsMenu: () => cy.contains('.sidebar-label', 'Compensations'),
        reportsMenu: () => cy.contains('button', 'Reports'),
        additionalMenu: () => cy.contains('.dropdown-trigger', Cypress.env("login")),
        profileDropdown: () => cy.contains('.dropdown-item', 'Profile'),
        //menu items
        timeSheetItem:()=>cy.contains('a', "Timesheet"),
        utilizationItem:()=>cy.contains('.sidebar-label', "Utilization"),
        salariesItem:()=>cy.contains('.sidebar-label', "Salaries"),
        contractsItem:()=>cy.contains('.sidebar-label', "Employee Contracts"),
        managementItem:()=>cy.contains('.sidebar-label', "Management"),
        checkupReportItem:()=>cy.contains('.sidebar-label', "Checkup Report"),
        problemsInReportedHoursItem:()=>cy.contains('.sidebar-label', "Problems In Reported Hours"),
        
        //contect check
        percentPie: () => cy.get('.rate-value'), //change naming
        assingedProjectText:()=>cy.contains('td', "VistaNover")
    };

    validatePageLabelsAreVisible() {
        this.elements.worktrackLabel().should('be.visible');
        this.elements.utilizationLabel().should('be.visible');
        this.elements.assigmentsLabel().should('be.visible');
    };
    validateContentIsNotEmpty() {
        this.elements.percentPie().should('be.visible').and('not.have.text', '0%')
        this.elements.assingedProjectText().should('be.visible');
    };
}

module.exports = new homePage();
