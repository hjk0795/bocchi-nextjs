import Layout from "./layout";

describe('Layout', () => {
    it('should mount', () => {
        cy.mount(<Layout />);
    });

    it('should have children when provided', () => {
        cy.mount(<Layout>Test</Layout>);
        cy.get('div').contains('Test');
    });
});