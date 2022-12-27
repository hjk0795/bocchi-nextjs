import FormLabelControl from "./formLabelControl";

describe('FormLabelControl', () => {
    it('should mount', () => {
        cy.mount(<FormLabelControl label="Test" />);
        cy.get('label').contains("Test");
        cy.get('input').should('have.attr', 'name', 'test');
        cy.get('input').should('have.attr', 'type', 'test');
        cy.get('input').should('have.attr', 'placeholder', 'Test');
    });

    it('should not have default type attr value(value of the label) when the type prop explicitly provided', () => {
        cy.mount(<FormLabelControl label="Test" type="password" />);
        cy.get('input').should('have.attr', 'type', 'password');
    });

    it('when change occurs in input element, should call onChange', () => {
        cy.mount(<FormLabelControl label="Test" type="password" onChange={cy.spy().as('onChange')} />);
        cy.get('input').type("test");
        cy.get('@onChange').should('have.been.called');
    });
});