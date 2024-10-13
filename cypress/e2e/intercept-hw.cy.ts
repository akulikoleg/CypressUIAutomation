describe("Intercept homework", function(){

    before(()=> {
        cy.fixture('progress.json').then( (progress) => {
            Cypress.env("progress", progress);
        });
    });

    it("spy for network requests", () => {
        let $id: string;


        cy.intercept({resourceType:/xhr|fetch/}, {log:false});
        cy.intercept(
            {
                method: 'POST',
                url: "*/login"

            }).as("user-login");

        cy.intercept(
            {
                method: 'GET',
                url: `https://server-prod.pasv.us/course/coursesProgress/65e78abcd31a7a724ec2f46c`
            },
            ( function(req) {
                req.reply( function(res){
                    const manipData = Cypress.env('progress');
                    res.send(manipData);
                })
            })
        ).as('progress-update');


        cy.visit(`${Cypress.env('pasvProd')}/user/login`);
        cy.get("[id=\"normal_login_email\"]").type(Cypress.env('username'));
        cy.get("[id=\"normal_login_password\"]").type(Cypress.env('password'));
        cy.get("button[type=\"submit\"]").click();

        cy.wait('@user-login').then( res => {
            $id = res.response.body.payload.user._id;
            cy.url().should('be.eq', `${Cypress.env('pasvProd')}/profile/${$id}` );
        })

        //navigate to progress
        cy.get("[data-qa=\"progresses\"]").click();
        cy.wait('@progress-update').then(  function(elRes) {

            cy.wrap(elRes.response.body).should('deep.equal', Cypress.env('progress'));
        } )


    })


})