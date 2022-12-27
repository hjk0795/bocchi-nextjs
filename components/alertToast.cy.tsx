import AlertToast from "./alertToast";

describe('AlertToast', () => {
    it('should mount', () => {
        cy.mount(<AlertToast title="Test Title" message="Test Message" show={true}  setShow={cy.spy().as('setShow')}/>);
        cy.get('strong').contains("Test Title");
        cy.get('div').contains("Test Message");
        cy.get('div').closest('.toast').should('have.attr', 'class', 'fade toast show');
        cy.get('@setShow').should('have.been.called', false);
    });

    it('should not mount when the value of the show prop is false', () => {
        cy.mount(<AlertToast title="Test Title" message="Test Message" show={false}  setShow={cy.spy().as('setShow')}/>);
        cy.get('div').should('not.have.class', 'toast');
    });
});