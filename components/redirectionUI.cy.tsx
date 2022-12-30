import RedirectionUI from "./redirectionUI";
import { createMockRouter } from "../utils/test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe('RedirectionUI', () => {
    it('should mount', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <RedirectionUI title="Test Title" message="Test Message" />
            </RouterContext.Provider>,
        )
        cy.dataCy('title').contains('Test Title');
        cy.dataCy('message').contains('Test Message');
    });
});