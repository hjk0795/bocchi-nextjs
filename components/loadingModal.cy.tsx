import LoadingModal from "./loadingModal";
import { createMockRouter } from "../utils/test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe('LoadingModal', () => {
    it('should mount', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <LoadingModal />
            </RouterContext.Provider>,
        )
    });

    it('should show the LoadingModal', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <LoadingModal modalShow={true} />
            </RouterContext.Provider>,
        )
        cy.get('div').should('have.class', 'fade modal show');
    });

    it('after 5 seconds, relevant message should be rendered', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <LoadingModal modalShow={true} />
            </RouterContext.Provider>,
        )
        cy.wait(5000);
        cy.get('small').contains('Taking longer than usual..');
    });
});