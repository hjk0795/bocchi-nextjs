import RedirectionUI from "./redirectionUI";
import { createMockRouter } from "../utils/test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe('RedirectionUI', () => {
    it('should mount', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <RedirectionUI title="Test Title" />
            </RouterContext.Provider>,
        )
        cy.dataCy('title').contains('Test Title');
    });

    it('should mount with message', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <RedirectionUI title="Test Title" message="Test Message" />
            </RouterContext.Provider>,
        )
        cy.dataCy('title').contains('Test Title');
        cy.dataCy('message').contains('Test Message');
    });

    it('should redirect to the specified page when clicked', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <RedirectionUI title="Test Title" message="Test Message" pageToRedirect="/" />
            </RouterContext.Provider>,
        )
        cy.get('button').click();
        cy.get('@push').should('have.been.called', '/');
    });

    it('should redirect to previous page when clicked', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <RedirectionUI title="Test Title" message="Test Message" pageToRedirect="previous" />
            </RouterContext.Provider>,
        )
        cy.get('button').click();
        cy.get('@back').should('have.been.called');
    });

    it('should have the message about auto-redirection', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <RedirectionUI title="Test Title" message="Test Message" pageToRedirect="previous" isAutoRedirect={true} />
            </RouterContext.Provider>,
        )
        cy.dataCy('autoRedirectMessage').should('exist');
    });
});