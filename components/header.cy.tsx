import Header from "./header";
import { createMockRouter } from "../utils/test-utils/createMockRouter";
import { RouterContext } from 'next/dist/shared/lib/router-context'
import React from "react";

describe('Header', () => {
    it('should mount', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <Header />
            </RouterContext.Provider>,
        )
    });

    it('when Link components are clicked, router.push({path}) should be triggered', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <Header />
            </RouterContext.Provider>,
        )
        cy.get('a').contains('brand').click();
        cy.get('@push').should('have.been.called', '/');
        cy.get('button').should('have.class', 'navbar-toggler collapsed').click();
        cy.get('button').should('have.class', 'navbar-toggler');
        cy.get('a').contains('Chat').click();
        cy.get('@push').should('have.been.called', '/chat');
        cy.get('a').contains('Login').click();
        cy.get('@push').should('have.been.called', '/login');
    });
});