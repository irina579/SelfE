import loginPage from "../../Pages/loginPage"
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

describe('Hours verification POM', () => {
    let test_data
    let nonBillableTypes = [];
    const dayOfMonth = new Date().getDate();
    before(() => {
       //Cypress.session.clearAllSavedSessions();
        cy.fixture('test_data').then((data) => {
          test_data = data;
          })
    });
    beforeEach(() => {
        cy.visit('/')
        // Step 1: Intercept the automatically triggered request and store its response
        cy.intercept('GET', 'https://aim.belitsoft.com/api/non-billable-types', (req) => {
            req.continue((res) => {
            nonBillableTypes = res.body.map(item => item.name); // Extract 'name' field and store in nonBillableTypes
            });
        }).as('getNonBillableTypes');   
        // Step 2: Perform login
        loginPage.login();
        // Step 4: Wait for the automatically triggered request after login to complete
        cy.wait('@getNonBillableTypes');
    });
    if (dayOfMonth >= 20 || dayOfMonth <= 5) {
        it('Employees hours Project Types verification', { retries: 0, tags: ['smoke'] }, () => {
            new_timesheetPage.CheckNonBillableTypes(nonBillableTypes);
        });
    };  
    it('Employees tracked hours verification', { retries: 0, tags: ['smoke'] }, () => {
        new_timesheetPage.ValidateTrackedHours();
    });
})
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
    it('User can see Rate Calculator', () => {
        rateCalculatorPage.navigateToRateCalculatorPage()
        rateCalculatorPage.validateSalaryUpdate()
        //rateCalculatorPage.validateEmployeesSalaryFilled() //temporary disabled because of bug
    });   
    it('User can see Problems in reported hours page', { tags: ['smoke'] }, () => {
        problemsInReportedHoursPage.navigateToProblemsInReportedHoursPage()
        problemsInReportedHoursPage.validateContentExists()
        problemsInReportedHoursPage.checkThereAreNoProblemsEOMonth()
    }); 
    it.skip('User can see CheckUp Reports page', { tags: ['smoke'] }, () => {
        checkUpReportPage.navigateToCheckUpReport()
        checkUpReportPage.validateOpened()
    });      
})