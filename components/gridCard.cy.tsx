import GridCard from "./gridCard";
import { createMockRouter } from "../utils/test-utils/createMockRouter";
import { RouterContext } from 'next/dist/shared/lib/router-context'

describe('GridCard', () => {
    it('should mount', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard />
            </RouterContext.Provider>,
        )
    });

    it('image should be rendered when imgSrc prop provided', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc="https://cdn-icons-png.flaticon.com/512/84/84042.png" />
            </RouterContext.Provider>,
        )
        cy.get('img').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/84/84042.png');
        cy.get('img').should('have.attr', 'alt', 'Image');
        cy.get('img').should('have.class', 'card-img-top gridCard_cardImg__rj9DO');
        cy.get('button').should('have.css', 'cursor', 'default');
    });

    it('imgAlt should be inserted in alt attribute in img element', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc="https://cdn-icons-png.flaticon.com/512/84/84042.png" imgAlt="testAlt" />
            </RouterContext.Provider>,
        )
        cy.get('img').should('have.attr', 'alt', 'testAlt');
    });

    it('title should be inserted when provided', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc="https://cdn-icons-png.flaticon.com/512/84/84042.png" imgAlt="testAlt" title="testTitle" />
            </RouterContext.Provider>,
        );
        cy.get('span').contains('testTitle');
        cy.get('div').should('have.class', 'gridCard_cardTitleOnly__lFXac card-title h5');
    });

    it('title should be inserted in alt attribute in img element when imgAlt is not provided', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc="https://cdn-icons-png.flaticon.com/512/84/84042.png" title="testTitle" />
            </RouterContext.Provider>,
        );
        cy.get('img').should('have.attr', 'alt', 'testTitle');
    });

    it('subTitle should be inserted when provided', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc="https://cdn-icons-png.flaticon.com/512/84/84042.png" imgAlt="testAlt" title="testTitle" subTitle="testSubTitle" />
            </RouterContext.Provider>,
        );
        cy.get('span').contains('testSubTitle');
        cy.get('div').should('have.class', 'gridCard_cardTitleSubTitle__jp7ml card-title h5');
    });

    it('different style should be applied when isBigSize is true', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc="https://cdn-icons-png.flaticon.com/512/84/84042.png" imgAlt="testAlt" title="testTitle" subTitle="testSubTitle" isBigSize={true} />
            </RouterContext.Provider>,
        );
        cy.get('img').should('have.class', 'card-img-top gridCard_cardImgBigSize__2Npxo');
    });

    it('when linkHref is provided and the button is clicked, router.push(linkHref) should be triggered', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc="https://cdn-icons-png.flaticon.com/512/84/84042.png" imgAlt="testAlt" title="testTitle" subTitle="testSubTitle" isBigSize={true} linkHref="testLink" />
            </RouterContext.Provider>,
        );
        cy.get('button').should('have.css', 'cursor', 'pointer');
        cy.get('button').click();
        cy.get('@push').should('have.been.called', "testLink");
    });
});