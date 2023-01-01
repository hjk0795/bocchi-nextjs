import LoadingModal from "./loadingModal";
import { createMockRouter } from "../utils/test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe('LoadingModal', () => {
    it('should mount', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <LoadingModal modalShow={true}/>
            </RouterContext.Provider>,
        )
    });
});