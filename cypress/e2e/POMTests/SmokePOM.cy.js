import loginPage from "../../Pages/loginPage"
import homePage, { validateContentIsNotEmpty, validatePageLabelsAreVisible } from "../../Pages/homePage"
import profilePage from "../../Pages/old_profilePage";
import timesheetPage from "../../Pages/old_timesheetPage";
import utilizationPage from "../../Pages/utilizationPage";
import salaryPage from "../../Pages/salaryPage";
import projectsPage from "../../Pages/projectsPage";
import rateCalculatorPage, { navigateToRateCalculatorPage } from "../../Pages/rateCalculatorPage";
import problemsInReportedHoursPage from "../../Pages/problemsInReportedHoursPage";
import checkUpReportPage from "../../Pages/checkUpReportPage";
import new_dashboardPage from "../../Pages/new_dashboardPage";
import new_timesheetPage from "../../Pages/new_timesheetPage";
import new_profilePage from "../../Pages/new_profilePage";
import new_contractsPage from "../../Pages/new_contractsPage";
import bonusesCalculationPage from "../../Pages/bonusesCalculationPage";
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
    it('User can see Utilization report', { tags: ['smoke'] }, () => {
        utilizationPage.navigateToUtilizationReport()
        utilizationPage.validateContentExists()
    });  
    it('User can see Salaries', { tags: ['smoke'] }, () => {
        salaryPage.navigateToSalaryPage()
        salaryPage.validateContentExists()
        salaryPage.validateSumCorrect()
    });  
    it('User can see Projects', { tags: ['smoke'] }, () => {
        projectsPage.navigateToProjectsPage()
        projectsPage.validateContentExists()
    }); 
    it('User can see Bonuses Calculation Page', { tags: ['smoke'] }, () => {
        bonusesCalculationPage.navigateToBonusesCalculationPage()
        bonusesCalculationPage.validateContentExists()
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
})