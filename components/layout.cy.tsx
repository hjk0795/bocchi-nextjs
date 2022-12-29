import Layout from "./layout";

describe('Layout', () => {
    it('should mount', () => {
        cy.mount(<Layout />);
    });
});