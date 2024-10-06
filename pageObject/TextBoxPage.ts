import {TextBoxData} from "../interface/interface"

export class TextBoxPage {

    constructor() {    }

    goto = () => cy.visit("https://demoqa.com/text-box");
    fillFormValidCredentials = (obj: TextBoxData) => {

        cy.get("#userName").type(obj.validData.fullName);
        cy.get("#userEmail").type(obj.validData.email);
        cy.get("#currentAddress").type(obj.validData.currentAddress);
        cy.get("#permanentAddress").type(obj.validData.permanentAddress);

    }
    fillFormInvalidCredentials = (obj: TextBoxData) => {

        cy.get("#userName").type(obj.unvalidEmailData.fullName);
        cy.get("#userEmail").type(obj.unvalidEmailData.email);
        cy.get("#currentAddress").type(obj.unvalidEmailData.currentAddress);
        cy.get("#permanentAddress").type(obj.unvalidEmailData.permanentAddress);

    }
    checkResultFrame = (obj: TextBoxData)  => {
        cy.get("p#name").should('contain', obj.validData.fullName);
        cy.get("p#email").should('contain', obj.validData.email);
        cy.get("p#currentAddress").should('contain', obj.validData.currentAddress);
        cy.get("p#permanentAddress").should('contain', obj.validData.permanentAddress);

    }

    submitForm = () => cy.get("#submit").click();

}