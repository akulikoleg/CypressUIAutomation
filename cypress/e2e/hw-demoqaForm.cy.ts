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