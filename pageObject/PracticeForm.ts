import {ClientData} from "../interface/interface";

export class PracticeForm{
    constructor() {  }

    navigate = () => cy.visit("https://demoqa.com/automation-practice-form");
    fillForm = (obj: ClientData ) => {
            cy.get("#firstName").type(obj.firstName);
            cy.get("#lastName").type(obj.lastName);
            cy.get("#userEmail").type(obj.email);
            let gender;
            switch( obj.gender.toLowerCase() ){

                case "male": gender = 0; break;
                case "female": gender = 1; break;
                case "other": gender = 2; break;

            }
            cy.log("gender = " + gender);
            cy.get('.custom-control.custom-radio.custom-control-inline').eq(gender).click();
            cy.get("#userNumber").type(obj.phone);
            // work on datepicker block
            cy.get("#subjectsContainer").type(obj.subject);
            cy.get(".custom-control.custom-checkbox.custom-control-inline").then( el => {
                for(let i=0; i < el.length; i++){
                   let text = el[i].innerText;
                    if( obj['hobbies'][text]  )
                        cy.wrap(el).eq(i).click();
                }
            })
            cy.get('#uploadPicture').selectFile('cypress/filesToUpload/photoUpl.jpg');
            cy.get("#currentAddress").type(obj.currentAddress);
            //Select State
            cy.get("#state").click();
            cy.contains(obj.state).click();
            //Select city
            cy.get("#city").click();
            cy.contains(obj.city).click();
    }
    submitForm = () => cy.get("#submit").click();
}