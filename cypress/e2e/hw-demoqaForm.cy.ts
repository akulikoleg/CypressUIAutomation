import {ClientData} from "../../interface/interface";
import { practiceForm } from "../../pageObject/index";


describe('Demoqa practice form homework - fixture', () => {
    beforeEach(() => {
        cy.fixture('client.json').as("clientDt");
        practiceForm.navigate();
    })

    it('should submit form with valid data using alias', function () {

        const clientObj: ClientData = this.clientDt;
        practiceForm.fillForm(clientObj);
        practiceForm.submitForm();
        cy.get('.modal-content').should('be.visible');

    });
});

describe('Demoqa practice form homework - loads fixture first', () => {
    beforeEach(() => {
                practiceForm.navigate();
    })

    it('should submit form with valid data using alias', function () {

        cy.fixture('client.json').then( (obj: ClientData)  => {

            practiceForm.fillForm(obj);
            practiceForm.submitForm();
            cy.get('.modal-content').should('be.visible');

        })

    });
});


describe('Demoqa practice form homework - load once into a local variable', () => {

    let testData: ClientData;
    before( () => {

        cy.fixture('client.json').then( (data: ClientData) => {
            testData = data;
        })
    })

    beforeEach(() => {
        practiceForm.navigate();
    })

    it('should submit form with valid data using alias', function () {

            practiceForm.fillForm(testData);
            practiceForm.submitForm();
            cy.get('.modal-content').should('be.visible');

    });
});

describe('Demoqa practice form homework - load once into a local variable', () => {


    before( () => {
        cy.fixture('client.json').then( (obj: ClientData) => {
            Cypress.env("clientData", obj)
        })
    })

    beforeEach(() => {
        practiceForm.navigate();
    })

    it('should submit form with valid data using Cypress.env object', function () {

        practiceForm.fillForm(Cypress.env('clientData'));
        practiceForm.submitForm();
        cy.get('.modal-content').should('be.visible');

    });
});