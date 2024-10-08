
describe('MouseAction', () => {

    beforeEach(()=>{
        cy.visit("https://webdriveruniversity.com/");
        cy.get("#actions").scrollIntoView()
            .invoke("removeAttr", "target")
            .click();
    })

    it('drag and drop', () => {

        cy.get("#droppable").invoke('text').invoke('trim').should('eq', "DROP HERE!");
        cy.get("#droppable").should('have.css', "background-color", "rgb(97, 109, 179)");

       // cy.get("//div[@id=\"draggable\"]")  |
        cy.get("#draggable").trigger('mousedown', {which:0})
        cy.get("#droppable").trigger('mousemove').trigger('mouseup', {force:true});

        cy.get("#droppable").invoke('text').invoke('trim').should('eq', "Dropped!");
        cy.get('#droppable [style^=\"background-color:\"').should('have.css', "background-color", "rgb(244, 89, 80)");

    });

    it('Double click', () => {

      cy.get("#double-click").should(color => {
            expect(color).to.have.css('background-color', 'rgb(254, 196, 45)');
      })
      cy.get("#double-click").dblclick();
      cy.get("#double-click").then(el => {
          expect(el).to.have.css('background-color', 'rgb(147, 203, 90)');
      })

    });

    it('should able to hold click', () => {
        cy.get("#click-box").trigger('mousedown', {which:1}) // the same like {button:1}
            .then( element => {
                expect(element).to.have.css("background-color", "rgb(0, 255, 0)");
            })
    });

    it('hoverover', () => {
        cy.get(".dropbtn").each( (el,index) => {
            cy.wrap(el).realHover(); // realHover getting from NPM cypress
            cy.get(".dropdown-content a.list-alert").eq(index).should("be.visible");
        } )
    });

});