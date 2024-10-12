describe('Intercept', () => {

    it('spy for network requests', () => {

        cy.fixture('profile.json').as('data');
        cy.intercept('POST', '*/login').as('login');
        cy.intercept({resourceType:/xhr|fetch/}, {log:false});

        cy.intercept(
            {
                method: 'GET',
                url: "https://server-prod.pasv.us/user/profile"
            },
            // {
            //     statusCode: 500,
            //     delay: 10000
            // }
            (req) => {
                req.reply( (res) => {
                    const manipulatedData = { ...this.data, additionalKey: 'newLine' };
                    res.send(manipulatedData);
                })
            }
        ).as('profile');


        cy.visit(`${Cypress.env('pasvProd')}/user/login`);
        cy.get('[id="normal_login_email"]').type(Cypress.env('email'));
        cy.get('[id="normal_login_password"]').type(Cypress.env('password'), {log: false});
        cy.get('button[type="submit"]').click();

        cy.wait('@login').then( (wholeResponse) => {
            console.log(wholeResponse, "wholeResponse");
            const id = wholeResponse.response.body.payload.user._id;
            cy.location().should( loc => {
                console.log(loc.href, "loc.href");
                expect(loc.href).to.eq(`https://coding.pasv.us/profile/${id}`);
                expect(wholeResponse.response.statusCode).to.equal(200);
            })
        });

        cy.visit("https://coding.pasv.us/settings/profile");
        cy.wait('@profile').then( el => {
            console.log(el, 'el');
            cy.wrap(el.response.body).should('deep.equal', {...this.data, additionalKey: 'newLine' }); // deep.equal for objects obj1 == obj2

        })
    })

});