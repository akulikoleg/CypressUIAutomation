describe('FORMS', () => {

    describe('DROPDOWN MENU', ()=> {

        beforeEach(() => {
            cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
            cy.log('Website loaded');
            console.log('CY loaded');
        })

        it('select value from first dropdownMenu', () => {
            cy.get('#dropdowm-menu-1').select('SQL').should('have.value', 'sql');
        })

        it('select value from second dropdownMenu', () => {
            cy.get('#dropdowm-menu-2').select('JUnit').should('have.value', 'junit').and('have.value', 'junit');
        })

        it('select value from third dropdownMenu', () => {
            cy.get('#dropdowm-menu-3').select('JavaScript').should('have.value', 'javascript').and('have.value', 'javascript');
        })

    })

    describe('CHECKBOXES', ()=> {

        beforeEach(() => {
            cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
            cy.log('Website loaded');
            console.log('CY loaded');
        })

        it('should check and unchecked checkbox 1', () => {
            cy.get('[type="checkbox"]').eq(0).check().should('be.checked');
        })

        it('should check all boxes', () => {
            cy.get('[type="checkbox"]').each(el => {
                cy.wrap(el).check().should('be.checked');
            } )
        })

        it('should uncheck all boxes', () => {
            cy.get('[type="checkbox"]').each(el => {
                cy.wrap(el).uncheck().should('not.be.checked')
            } )
        })


    })

    describe.only('RADIOBUTTON', ()=> {

        beforeEach(() => {
            cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
            cy.log('Website loaded');
            console.log('CY loaded');
        })

        it('should check radio button', () => {
            cy.get('[type="radio"]').eq(3).click().should('have.value', 'orange');
        })

        it('should check radiobtn green', () => {
            cy.get('[value="green"]').check().should('have.value', 'green');
        })

        it('check  radiobtn - blue', () => {
            cy.get('#radio-buttons').within( () => {
                cy.get('[value="blue"]').check().should('be.checked');
            })

        })

        it('check each radiobtn', () => {
            cy.get('#radio-buttons').within( () => {
                cy.get('[type="radio"]').each(radio => {
                    cy.wrap(radio).check({force:true}).should('be.checked');
                })
                cy.get('[type="radio"]:checked').should('have.length', 1);
            })

        })

    })

})