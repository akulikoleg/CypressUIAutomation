import { TextBoxData } from "../../interface/interface"
import {textboxPage} from "../../pageObject/index";
import { validData, unvalidEmailData } from "../fixtures/textBoxInfo.json"
import {TextBoxPage} from "../../pageObject/TextBoxPage";


describe('DemoQA text-box - option 1', () => {

    beforeEach('Navigate to demoqa/textbox', () =>  {

        cy.fixture("textBoxInfo.json").as("tbData"); // Ask Micha why setting alias not working in it()
        textboxPage.goto();

    })

    it("should submit the form successfully with valid data", function()  {



        const objData: TextBoxData = this.tbData;
        if(objData){

            textboxPage.fillFormValidCredentials(objData);
            textboxPage.submitForm();
            textboxPage.checkResultFrame(objData);

        }
        else cy.log("No data available");



    })
    
});


describe('DemoQA text-box - option 2', () => {

    it("Should submit data ", () => {

        textboxPage.goto();

        cy.fixture("textBoxInfo.json").then( (objData: TextBoxData) => {

            textboxPage.fillFormValidCredentials(objData);
            textboxPage.submitForm();
            // check result
            textboxPage.checkResultFrame(objData);

        } )

    })

});

describe('DemoQA text-box - option 3 using JSON import', () => {

    it("Should submit data", () => {

        textboxPage.goto();
        cy.get("#userName").type(validData.fullName);
        cy.get("#userEmail").type(validData.email);
        cy.get("#currentAddress").type(validData.currentAddress);
        cy.get("#permanentAddress").type(validData.permanentAddress);
        textboxPage.submitForm();
        cy.get("p#name").should('contain', validData.fullName);
        cy.get("p#email").should('contain', validData.email);
        cy.get("p#currentAddress").should('contain', validData.currentAddress);
        cy.get("p#permanentAddress").should('contain', validData.permanentAddress);

    })

});


describe('DemoQA text-box - option 4 load once into a local variable', () => {

    let currentData: TextBoxData;

    before( () => {
        cy.fixture("textBoxInfo.json").then( (obj: TextBoxData) => {
            currentData = obj;
        } )
    } )


    it("Should submit data", () => {

        textboxPage.goto();
        textboxPage.fillFormValidCredentials(currentData);
        textboxPage.submitForm();
        textboxPage.checkResultFrame(currentData);

    })

});

describe.only('DemoQA text-box - option 5 using cypress ENV', () => {

    before( () => {
        cy.fixture("textBoxInfo.json").then( (obj: TextBoxData) => {
            Cypress.env('save', obj )
        } )
    } )

    it("Should submit data", () => {

        textboxPage.goto();
        textboxPage.fillFormValidCredentials(Cypress.env('save'));
        textboxPage.submitForm();
        textboxPage.checkResultFrame(Cypress.env('save'));

    })

});