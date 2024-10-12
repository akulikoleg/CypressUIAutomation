describe('IFRAME', () => {

    describe.skip('webdriverUniversity', () => {
        beforeEach("goto page", () => {
            cy.visit('https://webdriveruniversity.com/index.html')
            cy.get('#iframe')
                .invoke('removeAttr', 'target')
                .click();
        })

        it('iframe' , () => {
            // cy.visit('https://webdriveruniversity.com/index.html')
            // cy.get('#iframe')
            //     .invoke('removeAttr', 'target')
            //     .click();


            cy.get('iframe').then((iframe) => {
                const body = iframe.contents().find("body")
                cy.wrap(body).find('[id="button-find-out-more"]').click();

                cy.wrap(body).find('.modal-body').should('contain', "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...");
            })
        })


        it('iframe using alias' , () => {
            // cy.visit('https://webdriveruniversity.com/index.html')
            // cy.get('#iframe')
            //     .invoke('removeAttr', 'target')
            //     .click();


            cy.get('[id="frame"]').then((iframe) => {
                const body = iframe.contents().find("body");
                cy.wrap(body).as('iframe');
                cy.get('@iframe').find('[id="button-find-out-more"]').click();
                cy.get('@iframe')
                    .find('.modal-body')
                    .should('contain', "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...");


            })
        })

        it('iframe using plugin ', () => {

            cy.frameLoaded('#frame');
            cy.iframe('#frame')
                .then( (iframe: JQuery) => {
                    cy.wrap(iframe).as('getIframe');
                    cy.get('@getIframe').find('[id="button-find-out-more"]').click();
                    cy.get('@getIframe')
                        .find('.modal-body')
                        .should('contain', "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...");
                })

        });

        it('iframe using CustomCommand' , () => {
            cy.getIframeBody("#frame").as('getIframe');
            cy.get('@getIframe').find('[id="button-find-out-more"]').click();
            cy.get('@getIframe')
                .find('.modal-body')
                .should('contain', "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...");

        })
    });


})