import { framePage }  from "../../pageObject/index";
import {FrameLetCode} from "../../interface/interface";


describe('Letcode IFrame', () => {

    const fname = 'James';
    const lname = 'Patrick';
    const email = 'kames@mail.com';

    beforeEach(()=>{
        framePage.open();
    })

    it('iframe option 1', () => {

        cy.fixture("frameLetCode.json").then((obj) => {

            framePage.getFirstIFrame().then( (iframe: JQuery) => {

                framePage.firstNameInput(iframe, obj.firstName);
                framePage.lastNameInput(iframe, obj.lastName);
                framePage.checkParagraph(iframe, obj.firstName, obj.lastName);
                framePage.checkEmailInput(iframe, obj.email)

            })

        })


    });

    it('iframe using alias ', () => {

       cy.get("#firstFr").then( ifr => {
            const body = ifr.contents().find('body');
            cy.wrap(body).as('iframe');
            cy.get("@iframe")
                .find('[name="fname"]').type(fname);
            cy.get("@iframe")
                .find('[name="lname"]').type(lname);
            cy.get("@iframe")
                .find('p').should('contain', 'You have entered ' + fname + ' ' + lname);
            cy.get("@iframe").find('iframe[src="innerFrame"]').then( (innerFrame: JQuery) => {
                const body2 = innerFrame.contents().find('body');
                cy.wrap(body2).as('innerBody');
                cy.get('@innerBody').find('[name="email"]').type(email);

                cy.get('@innerBody').find('[name="email"]').should('have.value', email);
            } )

        })
    });

    it('iframe using plugin', () => {

       cy.frameLoaded("#firstFr");
       cy.iframe("#firstFr").then( (iframe: JQuery) => {

           cy.wrap(iframe).as("getIframe");
           cy.get("@getIframe")
               .find('[name="fname"]').type(fname);
           cy.get("@getIframe")
               .find('[name="lname"]').type(lname);
           cy.get("@getIframe")
               .find('p').should('contain', 'You have entered ' + fname + ' ' + lname);
           cy.get("@getIframe").find("iframe[src='innerFrame']").then( (nestedIFrame) => {
               const body2 = nestedIFrame.contents().find('body');
               cy.wrap(body2).find('input[name="email"]')
                   .type(email)
                   .should('have.value', email);
           } )

       })




    });

    it.only("iframe using custom command", function(){

        cy.fixture("frameLetCode.json").then( (inpData: FrameLetCode) =>  {
            if(inpData){
                cy.getIframeBody("#firstFr").as('getIframe');
                cy.get("@getIframe")
                    .find('[name="fname"]').type(inpData.firstName);
                cy.get("@getIframe")
                    .find('[name="lname"]').type(inpData.lastName);
                cy.get("@getIframe")
                    .find('p').should('contain', 'You have entered ' + inpData.firstName + ' ' + inpData.lastName);
                cy.getIframeBody("#firstFr").find("[src=\"innerFrame\"]").then( (innerFrame: JQuery) => {
                    const innerbody =   innerFrame.contents().find('body');
                    cy.wrap(innerbody).find('input[name="email"]')
                        .type(inpData.email)
                        .should('have.value', inpData.email);
                })
            }

        })



    })

});