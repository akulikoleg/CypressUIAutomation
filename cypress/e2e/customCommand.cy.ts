describe('LOGIN', () => {

    describe('POSITIVE', ()=> {

        it('login page', () => {
            cy.login('pasvtestuser', 'test1234');
            cy.contains('My Account').should('be.visible');
            cy.contains('Welcome back test').should('be.visible');
        })

    })


    describe('NEGATIVE', ()=> {

        it('login page', () => {
            cy.login('passer', '12341234');
            cy.get('.alert-error')
                .should('be.visible')
                .and('contain.text', 'Error: Incorrect login or password provided.')
                .and('have.css', 'background-color', 'rgb(242, 222, 222)');
        })

    })

})

describe('loginHerokuapp', () => {

    it('should successfully login with valid credentials', () => {

        cy.loginHerokuapp('tomsmith', 'SuperSecretPassword!');
        cy.contains('Secure Area').should('be.visible');
        cy.url().should('include', '/secure');
        cy.get('[id="flash"]').should('have.css', 'background-color', 'rgb(93, 164, 35)');

    })

    it('should display an error for invalid credentials', () => {

        cy.loginHerokuapp('invalidData', 'invalidPassword');
        cy.get('[id="flash"]').should('contain.text', 'Your username is invalid!');
        cy.get('[id="flash"]').should('have.css', 'background-color', 'rgb(198, 15, 19)');

    })

    it('should display an error for missing password', () => {

        cy.loginHerokuapp('tomsmith');  // ask for right way
        cy.get('[id="flash"]').should('contain.text', 'Your password is invalid!');
        cy.get('[id="flash"]').should('have.css', 'background-color', 'rgb(198, 15, 19)');

    })
})

describe('login orangehrm', () => {

    it('login page', ()=> {

        cy.loginOrangeHrm('Admin', 'admin123')
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Time at Work').should('be.visible');
    })

})