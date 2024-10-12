describe('DEMOQA Drag and Drop', () => {

    beforeEach(() => {
        cy.visit('https://demoqa.com/droppable');
    })

    it('should drag an element and drop it', () => {

        cy.get("#droppable").invoke('text').should('eq', 'Drop here');

        cy.get("#draggable").trigger("mousedown", {which: 1});
        cy.get("#droppable").trigger('mousemove').trigger('mouseup', {force:true});
    });
});