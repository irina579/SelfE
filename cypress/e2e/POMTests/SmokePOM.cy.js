import loginPage from "../../Pages/loginPage"
import homePage, { validateContentIsNotEmpty, validatePageLabelsAreVisible } from "../../Pages/homePage"
import profilePage from "../../Pages/profilePage";
import timesheetPage from "../../Pages/timesheetPage";
import utilizationPage from "../../Pages/utilizationPage";
import salaryPage from "../../Pages/salaryPage";
import projectsPage from "../../Pages/projectsPage";
import rateCalculatorPage, { navigateToRateCalculatorPage } from "../../Pages/rateCalculatorPage";
import problemsInReportedHoursPage from "../../Pages/problemsInReportedHoursPage";
import contractsPage from "../../Pages/contractsPage";
import checkUpReportPage from "../../Pages/checkUpReportPage";
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
    it('User can see Homepage',{ tags: ['smoke'] }, () => {
        homePage.validatePageLabelsAreVisible()
        homePage.validatePageLabelsAreVisible()
        homePage.validateContentIsNotEmpty()
    });  
    it('User can see Profile Page',{ tags: ['smoke'] }, () => {
        profilePage.navigateToProfile()
        profilePage.validatePageLabelsAreVisible()
        profilePage.validatePeriodIsCorrect()
    });  
    it('User can see TimeSheet report', { tags: ['smoke'] }, () => {
        timesheetPage.navigateToTimesheetReport()
        timesheetPage.validateContentExists()
        timesheetPage.validateEmployeesHoursAreVisible()
    });  
    it('User can see Utilization report', { tags: ['smoke'] }, () => {
        utilizationPage.navigateToUtilizationReport()
        utilizationPage.validateContentExists()
    });  
    it.only('User can see Salaries', { tags: ['smoke'] }, () => {
        salaryPage.navigateToSalaryPage()
        salaryPage.validateContentExists()
        salaryPage.validateSumCorrect()
    });  
    it('User can see Projects', { tags: ['smoke'] }, () => {
        projectsPage.navigateToProjectsPage()
        projectsPage.validateContentExists()
    });   
    it('User can see Rate Calculator', () => {
        rateCalculatorPage.navigateToRateCalculatorPage()
        rateCalculatorPage.validateSalaryUpdate()
        rateCalculatorPage.validateEmployeesSalaryFilled()
    });   
    it('User can see Problems in reported hours page', { tags: ['smoke'] }, () => {
        problemsInReportedHoursPage.navigateToProblemsInReportedHoursPage()
        problemsInReportedHoursPage.validateContentExists()
    }); 
    it('User can see CheckUp Reports page', { tags: ['smoke'] }, () => {
        checkUpReportPage.navigateToCheckUpReport()
        checkUpReportPage.validateOpened()
    }); 
    it('User can see Contracts', { tags: ['smoke'] }, () => {
        contractsPage.navigateToContractsPage()
        contractsPage.validateContentExists()
    });  
    it('Contract page filters and search work properly (DDT)', () => {
        contractsPage.navigateToContractsPage()
        contractsPage.validateContentExists()
        contractsPage.validateFilterAndSearchWorks(test_data.search_employee_exists,test_data.contractor,test_data.contractor,test_data.non_contractor)
    });        
})