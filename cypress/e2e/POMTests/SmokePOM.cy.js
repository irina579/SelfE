import loginPage from "../../Pages/loginPage"
import homePage, { validateContentIsNotEmpty, validatePageLabelsAreVisible } from "../../Pages/homePage"
import profilePage from "../../Pages/old_profilePage";
import timesheetPage from "../../Pages/timesheetPage";
import utilizationPage from "../../Pages/utilizationPage";
import salaryPage from "../../Pages/salaryPage";
import projectsPage from "../../Pages/projectsPage";
import rateCalculatorPage, { navigateToRateCalculatorPage } from "../../Pages/rateCalculatorPage";
import problemsInReportedHoursPage from "../../Pages/problemsInReportedHoursPage";
import contractsPage from "../../Pages/contractsPage";
import checkUpReportPage from "../../Pages/checkUpReportPage";
import new_dashboardPage from "../../Pages/new_dashboardPage";
import new_timesheetPage from "../../Pages/new_timesheetPage";
import new_profilePage from "../../Pages/new_profilePage";
import new_contractsPage from "../../Pages/new_contractsPage";
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
    it('User can see Dashboard page',{ tags: ['smoke'] }, () => {
        new_dashboardPage.validatePageLabelsAreVisible()
        new_dashboardPage.validatePageLabelsAreVisible()
        new_dashboardPage.validateContentIsNotEmpty()
    });  
    it('User can see TimeSheet report', { tags: ['smoke'] }, () => {
        new_timesheetPage.navigateToTimesheetReport()
        new_timesheetPage.validateContentExists()
        new_timesheetPage.validateEmployeesHoursAreVisible()
    }); 
    it('User can see Profile Page',{ tags: ['smoke'] }, () => {
        new_profilePage.navigateToProfile()
        new_profilePage.validatePageLabelsAreVisible()
        new_profilePage.validatePeriodIsCorrect()
    }); 
    it('User can see Contracts', { tags: ['smoke'] }, () => {
        new_contractsPage.navigateToContractsPage()
        new_contractsPage.validateContentExists()
    });  
    it('Contract page filters and search work properly (DDT)', () => {
        new_contractsPage.navigateToContractsPage()
        new_contractsPage.validateContentExists()
        new_contractsPage.validateFilterAndSearchWorks(test_data.search_employee_exists,test_data.contractor,test_data.contractor,test_data.non_contractor)
    });  
    it.skip('User can see Homepage',{ tags: ['smoke'] }, () => {
        homePage.validatePageLabelsAreVisible()
        homePage.validatePageLabelsAreVisible()
        homePage.validateContentIsNotEmpty()
    });  
    it.skip('User can see Profile Page',{ tags: ['smoke'] }, () => {
        profilePage.navigateToProfile()
        profilePage.validatePageLabelsAreVisible()
        profilePage.validatePeriodIsCorrect()
    });  
    it.skip('User can see TimeSheet report', { tags: ['smoke'] }, () => {
        timesheetPage.navigateToTimesheetReport()
        timesheetPage.validateContentExists()
        timesheetPage.validateEmployeesHoursAreVisible()
    });  
    it.skip('User can see Utilization report', { tags: ['smoke'] }, () => {
        utilizationPage.navigateToUtilizationReport()
        utilizationPage.validateContentExists()
    });  
    it.skip('User can see Salaries', { tags: ['smoke'] }, () => {
        salaryPage.navigateToSalaryPage()
        salaryPage.validateContentExists()
        salaryPage.validateSumCorrect()
    });  
    it.only('User can see Projects', { tags: ['smoke'] }, () => {
        projectsPage.navigateToProjectsPage()
        projectsPage.validateContentExists()
    });   
    it.skip('User can see Rate Calculator', () => {
        rateCalculatorPage.navigateToRateCalculatorPage()
        rateCalculatorPage.validateSalaryUpdate()
        rateCalculatorPage.validateEmployeesSalaryFilled()
    });   
    it('User can see Problems in reported hours page', { tags: ['smoke'] }, () => {
        problemsInReportedHoursPage.navigateToProblemsInReportedHoursPage()
        problemsInReportedHoursPage.validateContentExists()
    }); 
    it.skip('User can see CheckUp Reports page', { tags: ['smoke'] }, () => {
        checkUpReportPage.navigateToCheckUpReport()
        checkUpReportPage.validateOpened()
    }); 
    it.skip('User can see Contracts', { tags: ['smoke'] }, () => {
        contractsPage.navigateToContractsPage()
        contractsPage.validateContentExists()
    });  
    it.skip('Contract page filters and search work properly (DDT)', () => {
        contractsPage.navigateToContractsPage()
        contractsPage.validateContentExists()
        contractsPage.validateFilterAndSearchWorks(test_data.search_employee_exists,test_data.contractor,test_data.contractor,test_data.non_contractor)
    });        
})