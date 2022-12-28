import { NextRouter } from "next/router";

export const createMockRouter = (router?: Partial<NextRouter>): NextRouter => {
    return {
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
        isFallback: false,
        basePath: '',
        events: { emit: cy.spy().as('emit'), off: cy.spy().as('off'), on: cy.spy().as('on') },
        push: cy.spy().as('push'),
        replace: cy.spy().as('replace'),
        reload: cy.spy().as('reload'),
        back: cy.spy().as('back'),
        prefetch: cy.stub().as('prefetch').resolves(),
        beforePopState: cy.spy().as('beforePopState'),
        forward: cy.spy().as('forward'),
        isLocaleDomain: false,
        isReady: false,
        isPreview: false,
        ...router
    }
}