const usernameDemo = 'james';
const passwordDemo = 'James123!';

// updated to custom command


describe('DEMOQA', () => {

    describe.skip('DEMOQA LOGIN', () => {

        it('should login with valid userName and Password', () => {
            cy.loginDemoQa(usernameDemo, passwordDemo );
            cy.url().should('include', '/profile');
        })

        it('should show error for invalid credentials', () => {
            cy.loginDemoQa('invalidUser', 'invalidPassword' );
            cy.get('[id="name"]').should('contain.text', 'Invalid username or password!');
            cy.get('[id="name"]').should('have.css', 'color', 'rgb(255, 0, 0)');
        })

    })

    describe.only('DEMOQA FORMS', () => {

        it('should take valid data and submit form', () => {
            cy.visit('https://demoqa.com/automation-practice-form#google_vignette');
            cy.get('#firstName').type('Mark').should('have.value', 'Mark');
            cy.get('#lastName').type('Patrick').should('have.value', 'Patrick');
            cy.get('#userEmail').type('mark.patrick@mail.com').should('have.value', 'mark.patrick@mail.com');
            cy.get('.custom-control.custom-radio.custom-control-inline').eq(1).click()//.should('be.checked');
            cy.get('#userNumber').type('9466569911');
            cy.get('#dateOfBirthInput').click();
            cy.get('.react-datepicker__year-select').select('1993').should('have.value', '1993');
            cy.get('.react-datepicker__month-select').select('April').should('have.value', '3');
            cy.get('.react-datepicker__day.react-datepicker__day--009').click();

            cy.get('#subjectsContainer').type('No subject');
            cy.get("#subjectsInput").should('have.value', 'No subject');// May not work; used blur(),

            cy.get('[type="checkbox"]').each(el => {
                cy.wrap(el).check( {force: true}).should('be.checked');
            });
            cy.get('#uploadPicture').selectFile('cypress/filesToUpload/photoUpl.jpg')//.should('co', 'photoUpl.jpg');
            cy.get('#currentAddress').type('456 ferra dr Munich SD').should('have.value', '456 ferra dr Munich SD');
            cy.get('#state').click();
            cy.get('#react-select-3-option-2').click();
            cy.get('#city').type('Karnal').type('{enter}');

            cy.get('.modal-content').should('be.visible');


        })

    })

})
