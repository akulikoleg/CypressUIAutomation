const url_login = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

describe('login', () => {

    it('login page', ()=> {
        cy.visit(url_login);
        cy.get('[placeholder="Username"]').type('Admin').blur();
        cy.get('[placeholder="Password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Time at Work').should('be.visible');
    })

})