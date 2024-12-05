class homePage {
    elements = {
        worktrackLabel: () => cy.findByText('Work Tracks'),
        utilizationLabel: ()=>cy.get('.card').last().findByText('Utilization'),
        assigmentsLabel: ()=>cy.findByText('Assignments'),
        toDoLabel:()=>cy.findByText('Todo List'),
//menu
        dashboardMenu: () => cy.contains('.nav-item', 'Dashboard'),
        finDepDocsMenu: () => cy.contains('.nav-item', 'FinDep Docs'),
        clientsMenu: () => cy.contains('.nav-item', 'Clients'),
        cfrManagementMenu: () => cy.contains('.nav-item', 'CFR Management'),
        groupsMenu: () => cy.contains('.nav-item', 'Groups'),
        rateCalculatorMenu: () => cy.contains('.nav-item', 'Rate calculator'),
        projectsMenu: () => cy.contains('.nav-item', 'Projects'),
        compensationsMenu: () => cy.contains('.nav-item', 'Compensations'),
        reportsMenu: () => cy.contains('.nav-item', 'Reports'),
        additionalMenu: () => cy.get('[aria-label="Additional Menu"]'),
        profileDropdown: () => cy.contains('.dropdown-item', 'Profile'),
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
        this.elements.percentPieText().should('not.contain.text', '0%');
        this.elements.assingedProjectText().should('be.visible');
    };
}

module.exports = new homePage();
