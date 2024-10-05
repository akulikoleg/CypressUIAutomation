describe.skip('LOGIN', () => {

    it('login page', () => {

        cy.visit('https://automationteststore.com/index.php?rt=account/login');
        cy.get('[id="loginFrm_loginname"]').type('pasvtestuser');
        cy.get('[id="loginFrm_password"]').type('test1234');
        cy.get('[title="Login"]').click();
        cy.contains('My Account').should('be.visible');
        cy.contains('Welcome back test').should('be.visible');
        console.log('Hello');
    })

} )

describe('localCoding Login', ()=> {

        describe('login positive', () => {

            afterEach('Logout from page', ()=> {
                if(cy.url().should('include', '/profile')) {
                    cy.get('[class="ant-dropdown-trigger ant-dropdown-link d-flex align-items-center"]')
                        .click()
                        .get('[data-qa="logout"]')
                        .click();

                }

            })

            it('login thru press Enter', () => {
                cy.visit('https://coding.pasv.us/user/login');
                cy.get('#normal_login_email').type('oaculov@gmail.com');
                cy.get('#normal_login_password')
                    .type('029721275hH')
                    .type('{enter}');
                cy.url().should('include', '/profile');
                cy.contains('OLEG ACULOV').should('be.visible');

            })


            it('login thru click submit btn', () => {

                cy.loginLocalCoding('oaculov@gmail.com', '029721275hH' );
                cy.url().should('include', '/profile');
                cy.contains('OLEG ACULOV').should('be.visible');

            })
        })

        describe('login negative', () => {

            it('login with invalid email', () => {
                cy.loginLocalCoding('invalidemail@gmail.com', '029721275hH' );
                cy.contains('User login. Fail').should('be.visible');

            })

            it('login with valid email & invalid password', () => {
                cy.loginLocalCoding('oaculov@gmail.com', '029721275' );
                cy.contains('User login. Fail').should('be.visible');

            })

        })




})