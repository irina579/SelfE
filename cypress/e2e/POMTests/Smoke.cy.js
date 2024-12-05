import loginPage from "../../Pages/loginPage"
import homePage, { validateContentIsNotEmpty, validatePageLabelsAreVisible } from "../../Pages/homePage"
import profilePage from "../../Pages/profilePage";
describe('Smoke tests', () => {
    beforeEach(() => {
        cy.visit('/')
        loginPage.login();
    });
    it('User can see Homepage', () => {
        homePage.validatePageLabelsAreVisible()
        homePage.validatePageLabelsAreVisible()
        homePage.validateContentIsNotEmpty()
    });  
    it('User can see Profile Page', () => {
        profilePage.navigateToProfile()
        profilePage.validatePageLabelsAreVisible()
        profilePage.validatePeriodIsCorrect()
    });  
})