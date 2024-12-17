describe('Smoke check', () => {
  let employees = Cypress.env('employees');
  let employees_eng = Cypress.env('employees_eng');
  let projects = Cypress.env('projects');
  let employees_count = Cypress.env('employees_count');
  let manual_hours_check = Cypress.env('manual_hours_check');
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  let counter=0;
  let test_data;
  before(() => {
      Cypress.session.clearAllSavedSessions();
      cy.fixture('test_data').then((data) => {
        test_data = data;
        })
  });

  beforeEach(() => {
    if (counter !== 0 && counter % 4 === 0) {
      Cypress.session.clearAllSavedSessions();
    } 
    cy.Login();
    counter=counter+1;
    cy.log("Counter="+counter)
    cy.viewport(1920, 1080);
  });   
  afterEach(function() { 
    //  cy.RefreshToken()
        // Check if the test failed
        cy.log(this.currentTest.state)
        cy.log(Cypress.currentTest.title)
        if (this.currentTest.state === 'passed') {
          cy.log('Test passed')
        }
        else {
          cy.log('Test failed')
          Cypress.session.clearAllSavedSessions();
          cy.reload()
          cy.wait(10000)
          cy.reload()
        }
    })
  it("User can see User Area and Profile", () => {
      cy.findByText('Work Tracks').should('be.visible');
      cy.findByText('Todo List').should('be.visible');
      //cy.findAllByText("Utilization").eq(1).should('be.visible'); Also works
      cy.get('.card').last().findByText('Utilization').should('be.visible')
      cy.findByText('Assignments').should('be.visible');
      cy.contains('.nav-item', "Dashboard").should('be.visible');
      cy.contains('.nav-item', "FinDep Docs").should('be.visible');
      cy.contains('.nav-item', "Clients").should('be.visible');
      cy.contains('.nav-item', "CFR Management").should('be.visible');
      cy.contains('.nav-item', "Groups").should('be.visible');
      cy.contains('.nav-item', "Rate calculator").should('be.visible');
      cy.contains('.nav-item', "Projects").should('be.visible');
      cy.contains('.nav-item', "Compensations").should('be.visible');
      cy.contains('.nav-item', "Reports").should('be.visible');

      cy.contains('.card-header', "Utilization").should('be.visible');
      cy.get('.pie').should('be.visible');
      cy.get('.pie>text').should('not.contain.text', '0%');

      cy.contains('.card-header', "Todo List").should('be.visible');
      cy.contains('.card-header', "Assignments").should('be.visible');
      cy.contains('td', "DASH > DASH 2024").should('be.visible');

      cy.get('[aria-label="Additional Menu"]').click();
      cy.contains('.dropdown-item', 'Profile').click();

      cy.contains('.card-header', "Salary plan").should('be.visible');
      cy.contains('td', "salary").should('be.visible');
      cy.contains('.card-header', "My salary report sheet (is not final financial information)*").should('be.visible');

      const date = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
      const result_date = date.toISOString().split('T')[0].substring(0, 7);
      cy.log(result_date);
      cy.contains('td', result_date).should('be.visible');
  });

  it("User can see TimeSheet report", () => {
      cy.contains('.nav-link', "Reports").click();
      cy.contains('.dropdown-item', "Timesheet").click();
      cy.get('.list-group-item').should('have.length.greaterThan', 1);
      cy.get('.pie').eq(0).should('be.visible');
      cy.get('.pie').eq(1).should('be.visible');
      for (let i = 0; i < employees.length; i++) {
          cy.contains('.list-group-item', employees[i]).scrollIntoView().click();
          cy.get('[data-bs-toggle="popover"]').eq(0).should('contain.text', employees[i]);
          cy.get('[data-bs-toggle="popover"]').last().should('contain.text', employees[i]);
          cy.get('.pie>text').eq(1).should('not.contain.text', '0%');
      }
  });

  it("User can see Utilization report", () => {
      cy.contains('.nav-link', "Reports").click();
      cy.contains('.dropdown-item', "Utilization").click();
      cy.contains('Utilization').should('exist');
      cy.contains('Noventiq Digital').scrollIntoView().should('exist');
      cy.get('.table').contains('td', 'Project Utilization').should('exist');
      cy.get('.table').contains('td', 'Project Utilization').next('td').should('not.be.empty');
  });

  it("User can see Contracts", () => {
      cy.contains('.nav-link', "CFR Management").click();
      cy.contains('.dropdown-item', "Employee Contracts").click();
      cy.contains('tr', 'QA Pool (' + employees_count + ')').should('exist');
      for (let i = 0; i < employees.length; i++) {
          cy.contains('tr', employees[i]).scrollIntoView().should('exist');
      }
  });

  it("User can see Rate calculator", () => {
      cy.contains('.nav-link', "Rate calculator").click();
      cy.contains('Rate Calculator').should('exist');
      cy.contains('td','Salary').next('td').eq(0).find('input')
       .clear()
       .should('have.value','')
       .type('1000')
       .should('have.value','1000')
      cy.contains('div','Zero Rate:').next().eq(0).should('have.text','13.1') //checks Zero rate
      cy.contains('span', "Custom Employee").should('exist').click();
      for (let i = 0; i < employees.length; i++) {
          cy.contains('.vs__dropdown-option', employees[i]).scrollIntoView().should('exist').click();
          cy.contains('span', employees[i]).should('exist').click();
      }
      
  });

  it("User can see Salaries", () => {
      cy.contains('.nav-link', "CFR Management").click();
      cy.contains('.dropdown-item', "Salaries").click();
      for (let i = 0; i < employees_eng.length; i++) {
          cy.contains('.fw-bold', employees_eng[i]).scrollIntoView().should('exist');
      }
  });

  it("User can see Projects", () => {
      cy.contains('.nav-link', "Projects").click();
      cy.contains('.dropdown-item', "Management").click();
      for (let i = 0; i < projects.length; i++) {
          cy.contains('.sticky-column', projects[i]).scrollIntoView().should('exist');
      }
  });

  it("User can see Problems in reported hours page", () => {
    cy.intercept('https://aim.belitsoft.com/api/problems-in-reported-hours').as('grid_list');
    cy.contains('.nav-link', "Reports").click();
    cy.contains('.dropdown-item', "Problems In Reported Hours").click();
    cy.wait('@grid_list').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
    });
    cy.contains('Problems In Reported Hours').should('exist');
    cy.contains('Period').scrollIntoView().should('exist');
    if (dayOfMonth >= 30) {
      cy.get('.local-striped').should('not.exist');
    }
  });
  it("Contract page filters and search work properly (DDT)", () => {
    cy.contains('.nav-link', "CFR Management").click();
    cy.contains('.dropdown-item', "Employee Contracts").click();
    cy.contains('tr', 'QA Pool (' + employees_count + ')').should('exist');
    //search among all
      //search existing employee
    cy.Search(test_data.search_employee_exists,test_data.contractor)
      //search non-existing employee
    cy.findByPlaceholderText('Search by employee name').clear().type(test_data.search_employee_not_exists)
    cy.contains('td',test_data.search_employee_not_exists).should('not.exist')
    cy.contains('td',test_data.contractor).should('not.be.visible')
    //filter by contractors
    cy.contains('.multiselect__placeholder','Type to search').click()
    cy.contains('li>span','Contractors').click()
   // cy.findByPlaceholderText('Search by employee name').clear().type(test_data.contractor)
    cy.findByPlaceholderText('Search by employee name').clear()
    cy.contains('td',test_data.contractor).should('be.visible')
    cy.contains('td',test_data.non_contractor).should('not.be.visible')
    //search among contractors
    cy.Search(test_data.contractor,test_data.non_contractor)
  });
});  