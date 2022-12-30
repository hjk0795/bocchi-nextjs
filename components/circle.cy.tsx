import Circle from "./circle";

describe('Circle', () => {
    it('should mount', () => {
        cy.mount(<Circle hidden={false} width="100px" height="100px" lineHeight="100px" backgroundImgURL="https://cdn-icons-png.flaticon.com/512/84/84042.png"/>);
        cy.dataCy('circle').should('have.attr', 'style', 'width: 100px; height: 100px; line-height: 100px; border: 1px solid black; background-image: url("https://cdn-icons-png.flaticon.com/512/84/84042.png");');
    });

    it('when the value of the hidden prop is true, white border line with no image is rendered', () => {
        cy.mount(<Circle hidden={true} width="100px" height="100px" lineHeight="100px" backgroundImgURL="https://cdn-icons-png.flaticon.com/512/84/84042.png"/>);
        cy.get('div').closest('.circle_circle__bK0F7').should('have.attr', 'style', 'width: 100px; height: 100px; line-height: 100px; border: 1px solid white;');
    });
});