describe('Smoke check', () => {
      let employees=Cypress.env('employees');
      let employees_eng=Cypress.env('employees_eng');
      let projects=Cypress.env('projects');
      before(() => {
        Cypress.session.clearAllSavedSessions()  
      })  
      beforeEach(() => {
      cy.Login()
      cy.viewport(1920, 1080)
      })
      it("User can see user area", () => {
        //Top menu
        cy.contains('.nav-item', "Dashboard").should('be.visible')
        cy.contains('.nav-item', "FinDep Docs").should('be.visible')
        cy.contains('.nav-item', "Clients").should('be.visible')
        cy.contains('.nav-item', "CFR Management").should('be.visible')
        cy.contains('.nav-item', "Groups").should('be.visible')
        cy.contains('.nav-item', "Rate calculator").should('be.visible')
        cy.contains('.nav-item', "Projects").should('be.visible')
        cy.contains('.nav-item', "Compensations").should('be.visible')
        cy.contains('.nav-item', "Reports").should('be.visible')

        //Utilization
        cy.contains('.card-header', "Utilization").should('be.visible')
        cy.get('.pie').should('be.visible')
        cy.get('.pie>text').should('not.contain.text','0%')
        //Salary plan
        cy.contains('.card-header', "Salary plan").should('be.visible')
        cy.contains('td', "salary").should('be.visible')
        //To do list
        cy.contains('.card-header', "Todo List").should('be.visible')
        //Assignments
        cy.contains('.card-header', "Assignments").should('be.visible')
        cy.contains('td', "DASH > DASH 2024").should('be.visible')
        //My salary report sheet (is not final financial information)*
        cy.contains('.card-header', "My salary report sheet (is not final financial information)*").should('be.visible')
        const date = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
        const result_date = date.toISOString().split('T')[0].substring(0,7)
        cy.log(result_date)
        cy.contains('td', result_date).should('be.visible') //checks the date in format current year-current month
      }) 
      it("User can see TimeSheet report", () => {
        cy.contains('.nav-link', "Reports").click()
        cy.contains('.dropdown-item', "Timesheet").click()
        cy.get('.list-group-item').should('have.length.greaterThan',1)
        cy.get('.pie').eq(0).should('be.visible')
        cy.get('.pie').eq(1).should('be.visible')
        for (let i=0;i<employees.length;i++){
          cy.contains('.list-group-item', employees[i]).scrollIntoView().click()
          cy.get('[data-bs-toggle="popover"]').eq(0).should('contain.text', employees[i])
          cy.get('[data-bs-toggle="popover"]').last().should('contain.text', employees[i])
          cy.get('.pie>text').eq(1).should('not.contain.text','0%')
        }
      })
      it("User can see Utilization report", () => {
        cy.contains('.nav-link', "Reports").click()
        cy.contains('.dropdown-item', "Utilization").click()
        cy.contains('Utilization').should('exist')
        cy.contains('QA Pool').scrollIntoView().should('exist')
        cy.get('.table').contains('td','Проектная утилизация').should('exist')
        cy.get('.table').contains('td','Проектная утилизация').next('td').should('not.be.empty')
      })
      it("User can see Contracts", () => {
        cy.contains('.nav-link', "CFR Management").click()
        cy.contains('.dropdown-item', "Employee Contracts").click()
        cy.contains('tr','QA Pool (13)').should('exist')
        for (let i=0;i<employees.length;i++){
          cy.contains('tr',employees[i]).scrollIntoView().should('exist')
        }
      })
      it("User can see Rate calculator", () => {
        cy.contains('.nav-link', "Rate calculator").click()
        cy.contains('Rate Calculator').should('exist')
        cy.contains('span', "Custom Employee").should('exist').click()
        for (let i=0;i<employees.length;i++){
          cy.contains('.vs__dropdown-option', employees[i]).scrollIntoView().should('exist').click()
          cy.contains('span', employees[i]).should('exist').click()
        }
      })
      it("User can see Salaries", () => {
        cy.contains('.nav-link', "CFR Management").click()
        cy.contains('.dropdown-item', "Salaries").click()
        for (let i=0;i<employees_eng.length;i++){
          cy.contains('.router-link-active', employees_eng[i]).scrollIntoView().should('exist')
        }
      })
      it("User can see Projects", () => {
        cy.contains('.nav-link', "Projects").click()
        cy.contains('.dropdown-item', "Management").click()
        for (let i=0;i<projects.length;i++){
          cy.contains('.sticky-column', projects[i]).scrollIntoView().should('exist')
        }
      })
})
 