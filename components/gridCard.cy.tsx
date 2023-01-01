import GridCard from "./gridCard";
import { createMockRouter } from "../utils/test-utils/createMockRouter";
import { RouterContext } from 'next/dist/shared/lib/router-context'

const TEST_IMAGE_URL = "https://cdn-icons-png.flaticon.com/512/84/84042.png";

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
                <GridCard imgSrc={TEST_IMAGE_URL} />
            </RouterContext.Provider>,
        )
        cy.get('img').should('have.attr', 'src', TEST_IMAGE_URL).and('have.attr', 'alt', 'Image');
        cy.get('img').should('have.css', 'height', '200px');
        cy.get('button').should('have.css', 'cursor', 'default');
    });

    it('imgAlt should be inserted in alt attribute in img element', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc={TEST_IMAGE_URL} imgAlt="testAlt" />
            </RouterContext.Provider>,
        )
        cy.get('img').should('have.attr', 'alt', 'testAlt');
    });

    it('title should be inserted when provided', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc={TEST_IMAGE_URL} imgAlt="testAlt" title="testTitle" />
            </RouterContext.Provider>,
        );
        cy.dataCy('title').contains('testTitle');
        cy.dataCy('cardTitle').should('not.have.css', 'display', 'flex');
    });

    it('title should be inserted in alt attribute in img element when imgAlt is not provided', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc={TEST_IMAGE_URL} title="testTitle" />
            </RouterContext.Provider>,
        );
        cy.get('img').should('have.attr', 'alt', 'testTitle');
    });

    it('subTitle should be inserted when provided', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc={TEST_IMAGE_URL} imgAlt="testAlt" title="testTitle" subTitle="testSubTitle" />
            </RouterContext.Provider>,
        );
        cy.dataCy('subTitle').contains('testSubTitle');
        cy.dataCy('cardTitle').should('have.css', 'display', 'flex').and('have.css', 'justify-content', 'space-between')
    });

    it('different style should be applied when isBigSize is true', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc={TEST_IMAGE_URL} imgAlt="testAlt" title="testTitle" subTitle="testSubTitle" isBigSize={true} />
            </RouterContext.Provider>,
        );
        cy.get('img').should('not.have.css', 'height', '200px');
    });

    it('when linkHref is provided and the button is clicked, router.push(linkHref) should be triggered', () => {
        const router = createMockRouter();
        cy.mount(
            <RouterContext.Provider value={router}>
                <GridCard imgSrc={TEST_IMAGE_URL} imgAlt="testAlt" title="testTitle" subTitle="testSubTitle" isBigSize={true} linkHref="testLink" />
            </RouterContext.Provider>,
        );
        cy.get('button').should('have.css', 'cursor', 'pointer');
        cy.get('button').click();
        cy.get('@push').should('have.been.called', "testLink");
    });
});