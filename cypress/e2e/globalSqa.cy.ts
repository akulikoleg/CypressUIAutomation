

describe.skip('Photo manager', () => {
        it("should move photo to trash using delete btn", () => {
            cy.visit("https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager");
            cy.contains("DRAG AND DROP").should("be.visible");
            cy.get(".ui-draggable").each((el, i) => {
                cy.wrap(el).trigger('mousedown', {button:1} );
                cy.get("#trash").should("have.css", "background", 'yellow');
                cy.get("#trash").trigger("mouseup");

            })
        })
});


describe.skip('Accepted Element', () => {

    const iframe1Selector = '[data-src="../../demoSite/practice/droppable/accepted-elements.html"]';
    const elemToFind = '#draggable';
    //const elemToFind = '[id=\'draggable\'].ui-widget-content.ui-draggable.ui-draggable-handle';
   // const elemToFind$ = '#draggable.ui-widget-content.ui-draggable.ui-draggable-handle.ui-draggable-dragging';

    beforeEach(() => {

            cy.visit("https://www.globalsqa.com/demo-site/draganddrop/#Accepted%20Elements");
            cy.get("[id=\"Accepted Elements\"]").click();

    })

    it("target should accept draggable element", () => {

            //cy.contains("Drag And Drop").should("contain", "Drag And Drop");
            cy.frameLoaded(iframe1Selector);
            cy.wait(5000);
            cy.iframe(iframe1Selector).scrollIntoView()
                .find(elemToFind)
                .should('be.visible');

    })

})


describe('Photo', () => {

    it.only('drag and drop', () => {
        cy.visit('https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager');
        cy.get('[data-src="../../demoSite/practice/droppable/accepted-elements.html"]').then(iframe => {
            const body = iframe.contents().find('body');
            cy.wrap(body).find('#gallery').within(() => {
                let text: string
                cy.get('> li')
                    .each((photo) => {cy.wrap(photo).find('h5').invoke('text').then((content) => {
                        cy.log(text)
                        text = content;
                        cy.log(text)
                        cy.wrap(photo)
                            .trigger('mousedown', { which: 1 })
                        cy.wrap(body).find('#trash')
                            .trigger('mousemove').trigger('mouseup', { force: true })
                        //                       cy.wrap(body).find('#trash > ul > li').find('h5').invoke('text').should('eq', text)
                        cy.log(text)
                        });
                    })
            })
        })
    })

})
