import loginPage from "../../Pages/loginPage"
import homePage, { validateContentIsNotEmpty, validatePageLabelsAreVisible } from "../../Pages/homePage"
import profilePage from "../../Pages/profilePage";
import timesheetPage from "../../Pages/timesheetPage";
import utilizationPage from "../../Pages/utilizationPage";
import salariesPage from "../../Pages/salaryPage";
import salaryPage from "../../Pages/salaryPage";
import projectsPage from "../../Pages/projectsPage";
import rateCalculatorPage, { navigateToRateCalculatorPage } from "../../Pages/rateCalculatorPage";
import problemsInReportedHoursPage from "../../Pages/problemsInReportedHoursPage";
import contractsPage from "../../Pages/contractsPage";
describe('Smoke tests POM', () => {
    let test_data
    before(() => {
       //Cypress.session.clearAllSavedSessions();
        cy.fixture('test_data').then((data) => {
          test_data = data;
          })
    });
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
        salaryPage.validateSumCorrect()
    });  
    it('User can see Projects', () => {
        projectsPage.navigateToProjectsPage()
        projectsPage.validateContentExists()
    });   
    it('User can see Rate Calculator', () => {
        rateCalculatorPage.navigateToRateCalculatorPage()
        rateCalculatorPage.validateSalaryUpdate()
        rateCalculatorPage.validateEmployeesSalaryFilled()
    });   
    it('User can see Problems in reported hours page', () => {
        problemsInReportedHoursPage.navigateToProblemsInReportedHoursPage()
        problemsInReportedHoursPage.validateContentExists()
    }); 
    it('User can see Contracts', () => {
        contractsPage.navigateToContractsPage()
        contractsPage.validateContentExists()
    });  
    it.skip('Contract page filters and search work properly (DDT)', () => {
        contractsPage.navigateToContractsPage()
        contractsPage.validateContentExists()
        contractsPage.validateFilterAndSearchWorks(test_data.search_employee_exists,test_data.contractor,test_data.contractor,test_data.non_contractor)
    });        
})