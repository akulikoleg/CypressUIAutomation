// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-iframe';
import "cypress-real-events";
// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

declare global {
    namespace Cypress {
        interface Chainable {
            //add your command here
            login: (email: string, password: string) => Cypress.Chainable<void>
            loginDemoQa: (email: string, password: string) => Cypress.Chainable<void>
            loginHerokuapp: (email: string, password?: string) => Cypress.Chainable<void>
            loginOrangeHrm: (email: string, password: string) => Cypress.Chainable<void>
            loginLocalCoding: (email: string, password: string) => Cypress.Chainable<void>
            getIframeBody: (iframe: string) => Cypress.Chainable<JQuery<HTMLElement>>
        }
    }
}
