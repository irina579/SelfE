const new_dashboardPage = require("./new_dashboardPage");

class bonusesCalculationPage {
	elements = {
		bonusesCalculationLabel: () => cy.contains('h1', 'Bonuses Calculation'),
		periodDropdown: () => cy.contains('label', 'Period').next('select'),
		projectLabel: () => cy.contains('th', 'Project'),
		tableRows: () => cy.get('tbody tr'),
	};

	navigateToBonusesCalculationPage() {
		new_dashboardPage.elements.projectsMenu().click();
        new_dashboardPage.elements.bonusesCalculationItem().click();
		this.elements.bonusesCalculationLabel().should('be.visible');
	}

	validateContentExists() {
        const currentMonth = new Date().toISOString().slice(0, 7);
        this.elements.periodDropdown().should('be.visible').should('have.value', currentMonth);
        this.elements.projectLabel().should('be.visible');
		this.elements.tableRows().its('length').should('be.gte', 0);
	}
}

module.exports = new bonusesCalculationPage();