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
