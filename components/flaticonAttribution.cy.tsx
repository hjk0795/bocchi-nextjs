import FlaticonAttribution from "./flaticonAttribution";

describe('FlaticonAttribution', () => {
    it('should mount', () => {
        cy.mount(<FlaticonAttribution name="test1" />);
    });
});