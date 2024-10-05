/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('login', (username: string, password: string)=> {
    cy.visit('https://automationteststore.com/index.php?rt=account/login');
    cy.get('[id="loginFrm_loginname"]').type(username);
    cy.get('[id="loginFrm_password"]').type(password);
    cy.get('[title="Login"]').click();
})

Cypress.Commands.add('loginDemoQa', (username: string, password: string)=> {
    cy.visit('https://demoqa.com/login#google_vignette');
    cy.get('[id="userName"]').type(username);
    cy.get('[id="password"]').type(password);
    cy.get('[id="login"]').click();
})

Cypress.Commands.add('loginHerokuapp', ( username: string, password?: string )=> {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.get('[id="username"]').type(username);
    if(password)  cy.get('[id="password"]').type(password);
    cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('loginOrangeHrm', (username: string, password: string)=> {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[placeholder="Username"]').type(username);
    cy.get('[placeholder="Password"]').type(password);
    cy.get('[type="submit"]').click();
})

Cypress.Commands.add('loginLocalCoding', (username: string, password: string)=> {
    cy.visit('https://coding.pasv.us/user/login');
    cy.get('#normal_login_email').type(username);
    cy.get('#normal_login_password').type(password);
    cy.get('[type="submit"]').click();
})

Cypress.Commands.add('getIframeBody', (iframe: string) => {
    return cy
        .get(iframe)
        .its('0.contentDocument.body') // access iFrame’s body
        .should('not.be.empty') // wait for the body to be available
        .then(cy.wrap) as Cypress.Chainable<JQuery<HTMLElement>> // wrap it so Cypress can interact
});


