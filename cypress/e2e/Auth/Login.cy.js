describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in with valid credentials', () => {
    cy.get('[placeholder="Username"]').type(Cypress.env('login'), { delay: 10 })
    cy.get('[placeholder="Password"]').type(Cypress.env('password'), { delay: 10 })
    cy.contains('.btn','Login').click()

    // Verify that user lands on the dashboard/home
    cy.contains('.card-header', 'Todo List').should('be.visible')
    cy.findByText('Work Tracks').should('be.visible')
  })
})



