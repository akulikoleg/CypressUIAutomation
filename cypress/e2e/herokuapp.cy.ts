let url = 'https://the-internet.herokuapp.com/login';
const username = 'tomsmith';
const password = 'SuperSecretPassword!';


describe('Login The Internet App', () => {

    beforeEach('', () => {
        cy.visit(url);
    })

    it('should successfully login with valid credentials', () => {

        cy.get('[id="username"]').type(username);
        cy.get('[id="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.contains('Secure Area').should('be.visible');
        cy.url().should('include', '/secure');
        cy.get('[id="flash"]').should('have.css', 'background-color', 'rgb(93, 164, 35)');

    })

    it('should display an error for invalid credentials', () => {

        cy.get('[id="username"]').type('invalidData');
        cy.get('[id="password"]').type('invalidPassword');
        cy.get('button[type="submit"]').click();
        cy.get('[id="flash"]').should('contain.text', 'Your username is invalid!');
        cy.get('[id="flash"]').should('have.css', 'background-color', 'rgb(198, 15, 19)');

    })

    it('should display an error for missing password', () => {

        cy.get('[id="username"]').type('tomsmith');
        cy.get('button[type="submit"]').click();
        cy.get('[id="flash"]').should('contain.text', 'Your password is invalid!');
        cy.get('[id="flash"]').should('have.css', 'background-color', 'rgb(198, 15, 19)');

    })

})