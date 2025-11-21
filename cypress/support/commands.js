// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands'
Cypress.Commands.add('Login', () => { 
    cy.session('Login',()=>{
        //cy.visit(Cypress.env('url'))
        cy.visit('/')
        cy.get('[placeholder="Username"]').type(Cypress.env("login"), {delay: 10})
        cy.get('[placeholder="Password"]').type(Cypress.env("password"), {delay: 10})
        cy.wait(500)
        cy.contains('.btn','Login').click()
        cy.findByText('Your Tasks').should('be.visible')},
      {cacheAcrossSpecs: true}
    ) 
    cy.visit('/')
  });
  Cypress.Commands.add('RefreshToken',()=>{ //not used for now
    cy.request({
      method: 'GET',
      url: 'https://aim.belitsoft.com/api/refresh-access-token', // Replace with your endpoint
    }).then((response) => {
    });
  });
  Cypress.Commands.add('Search',(search_employee,notsearch_employee)=>{ //search in Salary page
    cy.findByPlaceholderText('Search by employee name').clear().type(search_employee)
    cy.contains('td',search_employee).should('be.visible')
    cy.contains('td',notsearch_employee).should('not.be.visible')
    cy.contains('tr', 'QA Pool (1)').should('exist');
  });
  Cypress.Commands.overwrite('click', (originalFn, subject, ...args) => {
    const $el = subject.first();
    $el.css('outline', '3px solid red');
    setTimeout(() => $el.css('outline', ''), 300); // remove highlight after 300ms
    return originalFn(subject, ...args);
  });  
  Cypress.Commands.add('scrollUntilElementsStopIncreasing', (containerSelector, itemSelector) => {
    let previousCount = 0;
  
    const scrollAndCheck = () => {
      // Get the current number of items
      cy.get(itemSelector).then(($items) => {
        const currentCount = $items.length;
  
        // If the count is the same as the previous count, we stop scrolling
        if (currentCount === previousCount) {
          // Elements count didn't increase, so we are done
          cy.log(`Scrolling stopped. Total items loaded: ${currentCount}`);
          return;
        }
  
        // If the count has increased, we continue scrolling
        previousCount = currentCount;
  
        // Scroll to the last visible element within the container
        cy.get(containerSelector).find(itemSelector).last().scrollIntoView({ ensureScrollable: false });
  
        // Wait a bit for elements to load
        cy.wait(500); // Adjust the wait time as needed for your app
  
        // Check again by recursively calling the function
        scrollAndCheck();
      });
    };
  
    // Start the scrolling and checking loop
    scrollAndCheck();
  });
  

  