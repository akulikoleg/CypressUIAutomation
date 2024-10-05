

export class FramePage {

    constructor() {}

    getFirstIFrame = () => cy.get("#firstFr");
    findFrameBody = (iframe: JQuery) => iframe.contents().find('body');
    firstNameInput = (iframe: JQuery,  name: string) => {
        const body = iframe.contents().find('body');
        cy.wrap(body).find('[name="fname"]').type(name);
    }
    lastNameInput = (iframe: JQuery,  name: string) => {
        const body = iframe.contents().find('body');
        cy.wrap(body).find('[name="lname"]').type(name);
    }
    checkParagraph = (iframe: JQuery, fname, lname) => {
        const body = iframe.contents().find('body');
        cy.wrap(body).find("p").should('contain', 'You have entered ' + fname + ' ' + lname);
    }

    checkEmailInput = (iframe: JQuery,  email: string) => {
        const body = iframe.contents().find('body');
        cy.wrap(body).find('[src="innerFrame"]').then( ifr => {
            const body2 = ifr.contents().find('body');
            cy.wrap(body2).find('[name="email"]').type(email)
                .should('have.value', email);
        })
    }






    open = () => cy.visit('https://letcode.in/frame');
}