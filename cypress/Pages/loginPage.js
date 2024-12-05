const homePage = require("./homePage");

class loginPage {
    elements = {
        usernameField: () => cy.get('[placeholder="Username"]'),
        passwordField: ()=>cy.get('[placeholder="Password"]'),
        loginBtn: () => cy.contains('.btn','Login'),
    };

    login() {
        this.elements.usernameField().type(Cypress.env("login"), {delay: 10});
        this.elements.passwordField().type(Cypress.env("password"), {delay: 10});
        cy.wait(500);
        this.elements.loginBtn().click();
        cy.viewport(1920, 1080);
        homePage.elements.toDoLabel().should('be.visible')
    }
}

module.exports = new loginPage();