describe('Drag and drop - Global SQA ', () => {

    const getIframeDocument = (locator: string) => {
        return cy.get(locator)
            .its('0.contentDocument').should('exist')
    }
    const getIframeBody = (locator: string) => {
        return getIframeDocument(locator).its('body').should('not.be.undefined').then(cy.wrap)
    }

    describe.skip('Photo manager', () => {

        const photoManagerIframe = '[data-src="../../demoSite/practice/droppable/photo-manager.html"]';

        beforeEach(() => {

            cy.visit('https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager');
            cy.intercept({resourceType:/xhr|fetch/}, {log:false});

        })

        it("Should drag and drop first picture to the trash", () => {

            const log1 = getIframeBody(photoManagerIframe);
            console.log(log1)
            //precondotion
            getIframeBody(photoManagerIframe).find("[id=\"trash\"]").should('have.css', 'background-color', 'rgb(246, 246, 246)');

            getIframeBody(photoManagerIframe).find("[id='gallery']").find("[src=\"images/high_tatras_min.jpg\"]").trigger('mousedown', {which: 1});
            getIframeBody(photoManagerIframe).find("[id=\"trash\"]").trigger('mousemove').trigger('mouseup', {force:true});

            getIframeBody(photoManagerIframe).find("[id=\"trash\"]").find("[src=\"images/high_tatras_min.jpg\"]").should("exist");

        })

        it("Should drag and drop all pictures to the trash", () => {

            //precondotion
            getIframeBody(photoManagerIframe).find("[id=\"trash\"]").find("li").should('not.exist');

            //move all pictures
            getIframeBody(photoManagerIframe).find("[id='gallery']")
                .find("li")
                .each((photo, index) => {

                    cy.wrap(photo).trigger('mousedown', {which: 1});
                    getIframeBody(photoManagerIframe).find("[id=\"trash\"]").trigger('mousemove').trigger('mouseup', {force:true});

                  })

            getIframeBody(photoManagerIframe).find("[id=\"trash\"]").find("li").should("have.length", 4);

        })

    });

    describe('Accepted elements', () => {

        const acceptedElemIframe = '[rel-title="Accepted Elements"] > p > iframe';

        beforeEach(() => {
            cy.visit("https://www.globalsqa.com/demo-site/draganddrop/#Accepted%20Elements");
            cy.intercept({resourceType:/xhr|fetch/}, {log:false});


        })

        it.only("should accept draggable element", () => {

            //pre condition
            getIframeBody(acceptedElemIframe)
                .find('#droppable').invoke('text').should('contain', "accept: '#draggable'");

        })

        it("Artur's test", () => {

                cy.get('[id="Accepted Elements"]').click()
                const getIframeDocument1 = () => {
                    return cy
                        .get('[data-src="../../demoSite/practice/droppable/accepted-elements.html"]')
                        .its('0.contentDocument').should('exist')
                }
                const getIframeBody1 = () => {
                    return getIframeDocument1()
                        .its('body').should('not.be.undefined')
                        .then(cy.wrap)
                }
                getIframeBody1().find('#draggable-nonvalid').invoke('text').invoke('trim').should('eq', "I'm draggable but can't be dropped")
                getIframeBody1().find('#draggable-nonvalid').trigger('mousedown', { which: 1 })
                getIframeBody1().find('#droppable').should('have.css', 'background-color', 'rgb(233, 233, 233)')
                getIframeBody1().find('#draggable-nonvalid').trigger('mousemove').trigger('mouseup', { force: true })
                getIframeBody1().find('#droppable').should('have.css', 'background-color', 'rgb(233, 233, 233)')

        })

        it("Julia's test", () => {

            cy.get(`#Accepted\\ Elements`).click()
            cy.get('[rel-title="Accepted Elements"] > p > iframe').as('iframe')
            cy.get('@iframe').should('exist')
            cy.get('@iframe').should('be.visible')
            cy.get('@iframe').then(iframe => {
                const body = iframe.contents().find('body')
                cy.wrap(body).find('#droppable').should('have.css', 'background-color', 'rgb(233, 233, 233)')
                cy.wrap(body).find('#droppable').invoke('text').invoke('trim').should('eq', "accept: '#draggable'")

                cy.wrap(body).find('#draggable').trigger('mousedown', {which: 1})
                cy.wrap(body).find('#droppable').trigger('mousemove').trigger('mouseup', {force: true})
                cy.wrap(body).find('#droppable').should('have.css', 'background-color', 'rgb(255, 250, 144)')
                cy.wrap(body).find('#droppable').invoke('text').invoke('trim').should('eq', "Dropped!")

            })

        })


    })

});

