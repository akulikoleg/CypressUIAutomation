describe("Alert", () => {

    describe('lecture', () => {

        beforeEach(() => {
            cy.visit('https://webdriveruniversity.com/Popup-Alerts/index.html');
        })

        it('should display an alert with the correct message', () => {

            cy.on('window:alert', (alertMessage) => {
                expect(alertMessage).to.eq('I am an alert box!');
            })
            cy.get('#button1').click();
        })

        it('should display an alert with the correct message using spy comment',  () => {

            const alertStub = cy.stub();
            cy.on('window:alert',  alertStub );
            cy.get('#button1').click();
            cy.then( () => {

                expect(alertStub).to.be.calledOnce;
                expect(alertStub.getCall(0)).to.be.calledWith('I am an alert box!');

            } )

        })

        it('popup alert - modal',  () => {

            cy.get('#button2').click();
            cy.get('p').should('contain', 'We can inject and use JavaScript code if all else fails! Remember always try to use WebDriver Library method(s) first such as WebElement.');
            cy.contains('Close');
        })

        it('Ajax loader test',  () => {

            cy.get('#button3').click();
            cy.get('#loader', {timeout: 6_000}).should('not.be.visible');
            cy.contains('CLICK ME!').click();
            cy.get('.modal-content').should('contain', 'The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.');
            cy.contains('Close').click();

        })

        it('JavaScript Confirm Box - pressed OK',  () => {

            cy.on('window:confirm', (text)=> {
                expect(text).to.eq('Press a button!');
                return true;
            })
            cy.get('#button4').click();
            cy.get('#confirm-alert-text').should('contain', 'You pressed OK!');

        })

        it('JavaScript Confirm Box - pressed Cancel',  () => {

            cy.on('window:confirm', (text)=> {
                expect(text).to.eq('Press a button!');
                return false;
            })
            cy.get('#button4').click();
            cy.get('#confirm-alert-text').should('contain', 'You pressed Cancel!');

        })


    })

    describe('demoqa - homework', () => {

        beforeEach('Navigate to demoqa website', () => {
            cy.visit('https://demoqa.com/alerts');
        })

        it.skip('should display an alert with message', () => {

            cy.on('window:alert', (alert) => {
                expect(alert).to.eq('You clicked a button');
            })
            cy.get('#alertButton', {timeout: 1000}).click();

        });

        //  This alert appeared after 5 seconds
        it.skip('should display an alert with message after 5 seconds', () => {

            cy.on('window:alert', (alert) => {
                expect(alert).to.eq('This alert appeared after 5 seconds');
            })

            cy.get('#timerAlertButton').click();

        });


        it('should press OK on confirm box', () => {

            cy.on('window:confirm', (text) => {
                expect(text).to.eq('Do you confirm action?');
                return true;
            })
            cy.get('#confirmButton').click();
            cy.get('#confirmResult').should('contain', 'Ok');

        });

        it('should press Cancel on confirm box', () => {

            cy.on('window:confirm', (text) => {
                expect(text).to.eq('Do you confirm action?');
                return false;
            })
            cy.get('#confirmButton').click();
            cy.get('#confirmResult').should('contain', 'Cancel');

        });

        it('Prompt box should return entered message', () => {

            let message = `Your homework`;
            cy.window().then(win => {

                cy.stub(win, 'prompt').returns(message);
                cy.get('#promtButton').click();

            })
            cy.get('#promptResult').should('contain', 'You entered ' + message);

        })

    });

    describe.only('Lambdatest homework', () => {

        beforeEach('goto labdatest alerts', () => {
            cy.visit('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');
        })

        it('should display an alert with message', () => {

            cy.on('window:alert', (alert) => {
                expect(alert).to.eq('I am an alert box!');
            })
            cy.contains('Click Me').first().click();

        });

        it('should press OK on confirm box', () => {

            cy.on('window:confirm', (text) => {
                expect(text).to.eq('Press a button!');
                return true;
            })

            cy.get('.container > .flex > .w-full').find('button').eq(1).click();
            cy.get('#confirm-demo').should('contain', 'You pressed OK!');

        });

        it('should press Cancel on confirm box', () => {

            cy.on('window:confirm', (text) => {
                expect(text).to.eq('Press a button!');
                return false;
            })
            cy.get('.container > .flex > .w-full').find('button').eq(1).click();
            cy.get('#confirm-demo').should('contain', 'You pressed Cancel!');

        });

        it.only('Prompt box should return message', async () => {

            let message = `lambda homework`;
            cy.window().then(win => {

                cy.stub(win, 'prompt').returns(message);
                cy.get('.container > .flex > .w-full').find('button').eq(2).click().then(() => {
                    cy.get('#prompt-demo').should('contain', 'You have entered ' + "'" +  message + "'");
                })

            })

        })

    });

})