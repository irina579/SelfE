import loginPage from "../../Pages/loginPage"
import homePage, { validateContentIsNotEmpty, validatePageLabelsAreVisible } from "../../Pages/homePage"
import profilePage from "../../Pages/profilePage";
import timesheetPage from "../../Pages/timesheetPage";
import utilizationPage from "../../Pages/utilizationPage";
import salariesPage from "../../Pages/salaryPage";
import salaryPage from "../../Pages/salaryPage";
import projectsPage from "../../Pages/projectsPage";
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
    it('User can see TimeSheet report', () => {
        timesheetPage.navigateToTimesheetReport()
        timesheetPage.validateContentExists()
        timesheetPage.validateEmployeesHoursAreVisible()
    });  
    it('User can see Utilization report', () => {
        utilizationPage.navigateToUtilizationReport()
        utilizationPage.validateContentExists()
    });  
    it('User can see Salaries', () => {
        salaryPage.navigateToSalaryPage()
        salaryPage.validateContentExists()
    });  
    it('User can see Projects', () => {
        projectsPage.navigateToProjectsPage()
        projectsPage.validateContentExists()
    });       
})