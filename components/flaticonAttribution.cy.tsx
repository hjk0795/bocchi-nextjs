import FlaticonAttribution from "./flaticonAttribution";

describe('FlaticonAttribution', () => {
    it('should mount', () => {
        cy.mount(<FlaticonAttribution name="test" />);
        cy.dataCy('link').contains('test');
        cy.dataCy('link').should('have.attr', 'title', 'test icons');
        cy.dataCy('link').should('have.attr', 'href', 'https://www.flaticon.com/free-icons/test');
    });

    it('should append the value of alias prop for href when provided', () => {
        cy.mount(<FlaticonAttribution name="test" alias="aliasTest" />);
        cy.dataCy('link').should('have.attr', 'href', 'https://www.flaticon.com/free-icons/aliasTest');
    });
});