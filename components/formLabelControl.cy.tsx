import FormLabelControl from "./formLabelControl";

describe('FormLabelControl', () => {
    it('should mount', () => {
        cy.mount(<FormLabelControl label="Test" />);
        cy.dataCy('label').contains("Test");
        cy.dataCy('control').should('have.attr', 'name', 'test').and('have.attr', 'type', 'test').and('have.attr', 'placeholder', 'Test');
    });

    it('should not have default type attr value(value of the label) when the type prop explicitly provided', () => {
        cy.mount(<FormLabelControl label="Test" type="password" />);
        cy.dataCy('control').should('have.attr', 'type', 'password');
    });

    it('when change occurs in Form.Control, should call onChange', () => {
        cy.mount(<FormLabelControl label="Test" type="password" onChange={cy.spy().as('onChange')} />);
        cy.dataCy('control').type("test");
        cy.get('@onChange').should('have.been.called');
    });
});