describe('Employees hours verification', () => {
    let employees = Cypress.env('employees');
    let manual_hours_check = Cypress.env('manual_hours_check');
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    let nonBillableTypes = [];

    before(() => {
        Cypress.session.clearAllSavedSessions();
    });

    beforeEach(() => {

      // Step 1: Intercept the automatically triggered request and store its response
      cy.intercept('GET', 'https://aim.belitsoft.com/api/non-billable-types', (req) => {
        req.continue((res) => {
          nonBillableTypes = res.body.map(item => item.name); // Extract 'name' field and store in nonBillableTypes
        });
      }).as('getNonBillableTypes');   
      // Step 2: Perform login
      cy.Login();
      // Step 3: Set the viewport
      cy.viewport(1920, 1080);
    
      // Step 4: Wait for the automatically triggered request after login to complete
      cy.wait('@getNonBillableTypes');
    });   
    afterEach(function() { 
        // Check if the test failed
        cy.log(this.currentTest.state)
        cy.log(Cypress.currentTest.title)
        if (this.currentTest.state === 'passed') {
         // cy.SetClickUpParameter((myObject.passed),task_id,Cypress.env('clickup_usage'))       // Mark the ClickUp task as failed
          cy.log('Test passed')
        }
        else {
        //  cy.SetClickUpParameter((myObject.failed),task_id,Cypress.env('clickup_usage'))
          cy.log('Test failed')
          Cypress.session.clearAllSavedSessions();
          cy.reload()
          cy.wait(10000)
          cy.reload()
        }
    })
    // Condition to skip the test if the day of the month is less than 25
    if (dayOfMonth >= 10) {
        
      it("Employees hours Project Types verification", { retries: 0 }, () => {
          // Step 5: Visiting the timesheet page
          cy.visit('https://aim.belitsoft.com/reports/timesheet');
        
          // Checking that the list of employees exists and has more than 1 item
          cy.get('.list-group-item').should('have.length.greaterThan', 1);
        
          // Initialize an array for failures
          let Failors = [];
        
          // Iterate through the employees array and click on each employee's list item
          for (let i = 0; i < employees.length; i++) {
            cy.contains('.list-group-item', employees[i].name).scrollIntoView().click();

            cy.scrollUntilElementsStopIncreasing('tbody', 'tr');  //loading virtual list

            // Check if any of the non-billable text types are present in the table body
            cy.get('tbody').then(($tbody) => {
              const tbodyText = $tbody.text();
              cy.log(tbodyText)
              let foundNonBillableTypes = [];
        
              // Iterate over nonBillableTypes and find those present in the table text
              nonBillableTypes.forEach(type => {
                if (tbodyText.includes(type)) {
                  foundNonBillableTypes.push(type);
                }
              });
        
              // Log the specific types found for the current employee
              if (foundNonBillableTypes.length > 0) {
                Failors.push(`${employees[i].name}: ${foundNonBillableTypes.join(', ')}`);
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
              cy.log('All employees have passed the verification.');
            }
          });
        });
    }
    it("Employees hours verification", { retries: 0 }, () => {
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
              cy.contains('.list-group-item', employees[i].name).scrollIntoView().click();
              cy.get('[data-bs-toggle="popover"]').eq(0).should('contain.text', employees[i].name);
              cy.get('[data-bs-toggle="popover"]').last().should('contain.text', employees[i].name);

              cy.get('.pie>text').eq(1).then(($text) => {
                  let hours = $text.text().trim().substring(0, $text.text().trim().length - 1);
                  cy.log("Hours found for employee " + employees[i].name + " - " + hours);

                  if (hours < required_hours*employees[i].fte) { //checking hours considering employee's FTE
                      Failors.push(employees[i].name + " - Actual hours: " + hours);
                  }
              });
          }

          cy.then(() => {
              if (Failors.length > 0) {
                  cy.log('Failures:', Failors);
                  const dataString = Failors.join('\n');
                  cy.writeFile('cypress/fixtures/hours_failed.txt', dataString).then(() => {
                      cy.readFile('cypress/fixtures/hours_failed.txt').then((data) => {
                          expect(Failors.length).to.be.lte(0, `Custom Error: Some employees have less than `+required_hours+`(considering 1 FTE)`+`: \n${data}`);
                      });
                  });
              } else {
                  cy.log('All employees have sufficient hours.');
              }
          });
      });
  });
});  