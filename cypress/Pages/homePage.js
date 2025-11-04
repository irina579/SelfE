class homePage {
    elements = {
        worktrackLabel: () => cy.findByText('Work Tracks'),
        utilizationLabel: ()=>cy.get('.card').last().findByText('Utilization'),
        assigmentsLabel: ()=>cy.contains('.card-header','Assignments'),
        toDoLabel:()=>cy.findByText('Todo List'),
//menu
        dashboardMenu: () => cy.contains('.nav-link', 'Dashboard'),
        finDepDocsMenu: () => cy.contains('.nav-link', 'FinDep Docs'),
        clientsMenu: () => cy.contains('.nav-link', 'Clients'),
        cfrManagementMenu: () => cy.contains('.nav-link', 'CFR Management'),
        groupsMenu: () => cy.contains('.nav-link', 'Groups'),
        rateCalculatorMenu: () => cy.contains('.nav-link', 'Rate calculator'),
        projectsMenu: () => cy.contains('.nav-link', 'Projects'),
        compensationsMenu: () => cy.contains('.nav-link', 'Compensations'),
        reportsMenu: () => cy.contains('.nav-link', 'Reports'),
        additionalMenu: () => cy.get('.dropdown-trigger,'),
        profileDropdown: () => cy.contains('.dropdown-item', 'Profile'),
        //menu items
        timeSheetItem:()=>cy.contains('.dropdown-item', "Timesheet"),
        utilizationItem:()=>cy.contains('.dropdown-item', "Utilization"),
        salariesItem:()=>cy.contains('.dropdown-item', "Salaries"),
        contractsItem:()=>cy.contains('.dropdown-item', "Employee Contracts"),
        managementItem:()=>cy.contains('.dropdown-item', "Management"),
        checkupReportItem:()=>cy.contains('.dropdown-item', "Checkup Report"),
        problemsInReportedHoursItem:()=>cy.contains('.dropdown-item', "Problems In Reported Hours"),
        
        //contect check
        percentPie: () => cy.get('.pie'),
        percentPieText:()=>cy.get('.pie>text'),
        assingedProjectText:()=>cy.contains('td', "DASH > DASH 2024")
    };

    validatePageLabelsAreVisible() {
        this.elements.worktrackLabel().should('be.visible');
        this.elements.utilizationLabel().should('be.visible');
        this.elements.assigmentsLabel().should('be.visible');
    };
    validateContentIsNotEmpty() {
        this.elements.percentPie().should('be.visible');
        this.elements.percentPieText().should('not.have.text', '0%');
        this.elements.assingedProjectText().should('be.visible');
    };
}

module.exports = new homePage();
