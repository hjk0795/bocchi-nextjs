import Circle from "./circle";

const TEST_IMAGE_URL = "https://cdn-icons-png.flaticon.com/512/84/84042.png";

describe('Circle', () => {
    it('should mount', () => {
        cy.mount(<Circle hidden={false} width="100px" height="100px" lineHeight="100px" backgroundImgURL={TEST_IMAGE_URL}/>);
        cy.dataCy('circle').should('have.attr', 'style', `width: 100px; height: 100px; line-height: 100px; border: 1px solid black; background-image: url("${TEST_IMAGE_URL}");`);
    });

    it('when the value of the hidden prop is true, white border line with no image is rendered', () => {
        cy.mount(<Circle hidden={true} width="100px" height="100px" lineHeight="100px" backgroundImgURL={TEST_IMAGE_URL}/>);
        cy.dataCy('circle').should('have.attr', 'style', 'width: 100px; height: 100px; line-height: 100px; border: 1px solid white;');
    });
});