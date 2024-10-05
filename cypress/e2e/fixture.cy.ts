import {ContactData} from "../../interface/interface";
// @ts-ignore
import {validSubmission, invalidEmail } from '../fixtures/contact-us.json';

describe('Fixtures', () => {

    beforeEach(() => {
        cy.fixture('contact-us.json').as('data');
        cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html")
    });

    it('should submit the form succesfully with valid data', function () { // if using () => {} isolate it and read property this

        const testData: ContactData = this.data;
        if(testData.validSubmission){

            console.log(testData);
            cy.get('[name="first_name"]').type(testData.validSubmission.firstName);
            cy.get('[name="last_name"]').type(testData.validSubmission.lastName);
            cy.get('[name="email"]').type(testData.validSubmission.email);
            cy.get('[name="message"]').type(testData.validSubmission.message);
            cy.get("input[type='submit']").click();
            cy.get("h1").should("contain", "Thank You for your Message!" );

        }

    });

    it('should show error from invalid email', function () { // if using () => {} isolate it and read property this

        const testData: ContactData = this.data;
        if(testData.invalidEmail){

            console.log(testData);
            cy.get('[name="first_name"]').type(testData.invalidEmail.firstName);
            cy.get('[name="last_name"]').type(testData.invalidEmail.lastName);
            cy.get('[name="email"]').type(testData.invalidEmail.email);
            cy.get('[name="message"]').type(testData.invalidEmail.message);
            cy.get("input[type='submit']").click();
            cy.get("body").should("contain", "Invalid email address" );

        }

    });

});

describe('FIXTURES/2', () => {
    beforeEach(() => {

        cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html")
    });

    it('should submit the form ', () => {
        cy.fixture('contact-us.json').then( (el) => {

                if(el.validSubmission){

                    console.log(el);
                    cy.get('[name="first_name"]').type(el.validSubmission.firstName);
                    cy.get('[name="last_name"]').type(el.validSubmission.lastName);
                    cy.get('[name="email"]').type(el.validSubmission.email);
                    cy.get('[name="message"]').type(el.validSubmission.message);
                    cy.get("input[type='submit']").click();
                    cy.get("h1").should("contain", "Thank You for your Message!" );

                }


        })
    });

    it('should show error from invalid email /2', function () { // if using () => {} isolate it and read property this

        cy.fixture('contact-us.json').then( (el) => {
            if(el.invalidEmail){

                cy.get('[name="first_name"]').type(el.invalidEmail.firstName);
                cy.get('[name="last_name"]').type(el.invalidEmail.lastName);
                cy.get('[name="email"]').type(el.invalidEmail.email);
                cy.get('[name="message"]').type(el.invalidEmail.message);
                cy.get("input[type='submit']").click();
                cy.get("body").should("contain", "Invalid email address" );

            }

        })


    });


});


describe.only('FIXTURES/3', () => {
    beforeEach(() => {
        cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html")
    });

    it('should submit form', () => {
            if(validSubmission){

                cy.get('[name="first_name"]').type(validSubmission.firstName);
                cy.get('[name="last_name"]').type(validSubmission.lastName);
                cy.get('[name="email"]').type(validSubmission.email);
                cy.get('[name="message"]').type(validSubmission.message);
                cy.get("input[type='submit']").click();
                cy.get("h1").should("contain", "Thank You for your Message!" );

            }
    });

    it('should show an error on invalid submission', () => {
        if(validSubmission){

            cy.get('[name="first_name"]').type(invalidEmail.firstName);
            cy.get('[name="last_name"]').type(invalidEmail.lastName);
            cy.get('[name="email"]').type(invalidEmail.email);
            cy.get('[name="message"]').type(invalidEmail.message);
            cy.get("input[type='submit']").click();
            cy.get("body").should("contain", "Invalid email address" );

        }
    });


})


describe('fixture/4', () => {
    before(()=> {
        cy.fixture('contact-us.json').then( (contact) => {
            Cypress.env("sale", contact);
        });
    });
    beforeEach(() => {

        cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html")
    });
    it('shoul submit form', () => {
        cy.get('[name="first_name"]').type(Cypress.env('sale').validSubmission.firstName);
        cy.get('[name="last_name"]').type(Cypress.env('sale').validSubmission.lastName);
        cy.get('[name="email"]').type(Cypress.env('sale').validSubmission.email);
        cy.get('[name="message"]').type(Cypress.env('sale').validSubmission.message);
        cy.get("input[type='submit']").click();
        cy.get("h1").should("contain", "Thank You for your Message!" );
    })

    it('should show error from invalid email /2', function () { // if using () => {} isolate it and read property this

        cy.get('[name="first_name"]').type(Cypress.env('sale').invalidEmail.firstName);
        cy.get('[name="last_name"]').type(Cypress.env('sale').invalidEmail.lastName);
        cy.get('[name="email"]').type(Cypress.env('sale').invalidEmail.email);
        cy.get('[name="message"]').type(Cypress.env('sale').invalidEmail.message);
        cy.get("input[type='submit']").click();
        cy.get("body").should("contain", "Invalid email address" );

    });


});