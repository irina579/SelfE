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

Cypress.Commands.add('Login', () => { 
    cy.session('Login',()=>{
        cy.visit(Cypress.env('url'))
        cy.get('[placeholder="Username"]').type(Cypress.env("login"), {delay: 10})
        cy.get('[placeholder="Password"]').type(Cypress.env("password"), {delay: 10})
        cy.contains('.btn','Login').click()
        cy.contains('.card-header', "Todo List").should('be.visible')},
      {cacheAcrossSpecs: true}
    ) 
    cy.visit(Cypress.env('url'))
  })