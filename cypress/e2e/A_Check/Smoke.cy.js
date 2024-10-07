    describe('Smoke check', () => {
      let employees = Cypress.env('employees');
      let employees_eng = Cypress.env('employees_eng');
      let projects = Cypress.env('projects');
      let employees_count = Cypress.env('employees_count');
      let manual_hours_check = Cypress.env('manual_hours_check');
      const currentDate = new Date();
      const dayOfMonth = currentDate.getDate();
  
      before(() => {
          Cypress.session.clearAllSavedSessions();
      });
  
      beforeEach(() => {
          cy.Login();
          cy.viewport(1920, 1080);
      });
  
      // Condition to skip the test if the day of the month is less than 25
      if (dayOfMonth >= 25) {
          it("Employees hours Project Types verification", { retries: 0 }, () => {
              // Visiting the timesheet page
              cy.visit('https://aim.belitsoft.com/reports/timesheet');
  
              // Checking that the list of employees exists and has more than 1 item
              cy.get('.list-group-item').should('have.length.greaterThan', 1);
  
              // Initialize an array for failures
              let Failors = [];
  
              // Iterate through the employees array and click on each employee's list item
              for (let i = 0; i < employees.length; i++) {
                  cy.contains('.list-group-item', employees[i]).scrollIntoView().click();
  
                  // Initialize a Set to track unique incorrect types for this employee
                  let incorrectTypes = new Set();
  
                  // Once clicked, proceed to check the corresponding row's hours
                  cy.get('.local-striped').each(($row) => {
                      cy.wrap($row).find('td').eq(3).invoke('text').then((text) => {
                          const trimmedText = text.trim();
  
                          // If the text is not 'Billable', add the incorrect type to the Set
                          if (trimmedText !== 'Billable') {
                              incorrectTypes.add(trimmedText);
                          }
                      });
                  }).then(() => {
                      // After checking all rows for this employee, log the employee's incorrect types
                      if (incorrectTypes.size > 0) {
                          Failors.push(`${employees[i]} - Incorrect Types: ${[...incorrectTypes].join(', ')}`);
                      }
                  });
              }
  
              // After all the employees are processed
              cy.then(() => {
                  if (Failors.length > 0) {
                      // Log all failures
                      cy.log('Failures:', Failors);
  
                      // Write failures to a file in one go
                      const dataString = Failors.join('\n');
                      cy.writeFile('cypress/fixtures/types_incorrect.txt', dataString).then(() => {
                          cy.readFile('cypress/fixtures/types_incorrect.txt').then((data) => {
                              expect(Failors.length).to.be.lte(0, `Custom Error: Some employees have non-billable hours type: \n${data}`);
                          });
                      });
                  } else {
                      cy.log('All employees have "Billable" hours type.');
                  }
              });
          });
      }

      it("User can see User Area and Profile", () => {
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
              cy.contains('.router-link-active', employees_eng[i]).scrollIntoView().should('exist');
          }
      });
  
      it("User can see Projects", () => {
          cy.contains('.nav-link', "Projects").click();
          cy.contains('.dropdown-item', "Management").click();
          for (let i = 0; i < projects.length; i++) {
              cy.contains('.sticky-column', projects[i]).scrollIntoView().should('exist');
          }
      });
  
      it("User can see Problems in reported hours page", { retries: 0 }, () => {
        cy.contains('.nav-link', "Reports").click();
        cy.contains('.dropdown-item', "Problems in reported hours").click();
        cy.contains('Problems in reported hours').should('exist');
        cy.contains('Period').scrollIntoView().should('exist');
        if (dayOfMonth >= 30) {
          cy.get('.local-striped').should('not.exist');
        }
      });

      it("Employees hours verification", () => {
          cy.get('[aria-label="Additional Menu"]').click();
          cy.intercept('https://aim.belitsoft.com/api/profile/bonus-report').as('grid_list');
          cy.get('[href="/profile"]').click();
          cy.wait('@grid_list').then(({ response }) => {
              expect(response.statusCode).to.eq(200);
              let planned_hours = response.body[0].plan;
              cy.log("The number of Planned hours came from BE - " + planned_hours);
              let required_hours;
  
              if (manual_hours_check) {
                  required_hours = Cypress.env('required_hours');
              } else {
                  required_hours = planned_hours - 8;
              }
  
              cy.log("Required hours - " + required_hours);
              cy.visit('https://aim.belitsoft.com/reports/timesheet');
              cy.get('.list-group-item').should('have.length.greaterThan', 1);
  
              const Failors = [];
              for (let i = 0; i < employees.length; i++) {
                  cy.contains('.list-group-item', employees[i]).scrollIntoView().click();
                  cy.get('[data-bs-toggle="popover"]').eq(0).should('contain.text', employees[i]);
                  cy.get('[data-bs-toggle="popover"]').last().should('contain.text', employees[i]);
  
                  cy.get('.pie>text').eq(1).then(($text) => {
                      let hours = $text.text().trim().substring(0, $text.text().trim().length - 1);
                      cy.log("Hours found for employee " + employees[i] + " - " + hours);
  
                      if (hours < required_hours) {
                          Failors.push(employees[i] + " - Actual hours: " + hours);
                      }
                  });
              }
  
              cy.then(() => {
                  if (Failors.length > 0) {
                      cy.log('Failures:', Failors);
                      const dataString = Failors.join('\n');
                      cy.writeFile('cypress/fixtures/hours_failed.txt', dataString).then(() => {
                          cy.readFile('cypress/fixtures/hours_failed.txt').then((data) => {
                              expect(Failors.length).to.be.lte(0, `Custom Error: Some employees have less than required hours: \n${data}`);
                          });
                      });
                  } else {
                      cy.log('All employees have sufficient hours.');
                  }
              });
          });
      });
  });  

 