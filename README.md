## Task 1: Test plan
### Test Plan link: 
https://docs.google.com/document/d/1BBSqzorukk6SXzbPUmwUHhA-dmPJ9U4Or-WReqSz5QY/edit?usp=sharing

### Test Cases:
Test case document link is included in the test plan. Including it here again
https://docs.google.com/spreadsheets/d/1IAamubCDDQb7han2xAX5h3i4nNIjT7s4HsCs9m-xCAI/edit?usp=sharing



## Task 2: Star Wars API Automated Test

### Instruction to run the script:

- Clone the repo and Navigate to cypress folder

    `cd cypress`

-  Run `npm install`

-  Run Cypress test by using one of the command below 

    * Run api test case in headless mode

        `npm run test:api`

    * Run api test case in cypress test runner

        `npm run cy:open`

### Folder structure:

   API test cases spec file:

   `cypress/e2e/API/swplanetapi.cy.js`

   Test Data:

   `cypress/fixtures/planetsData1.json`

   Custom command:
   
   `cypress/support/commands.js`
