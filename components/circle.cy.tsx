import Circle from "./circle";

describe('Circle', () => {
    it('should mount', () => {
        cy.mount(<Circle hidden={false} width="100px" height="100px" lineHeight="100px" backgroundImgURL="https://cdn-icons-png.flaticon.com/512/84/84042.png"/>);
    });

    it('when the value of the hidden prop is true, no border, no image ', () => {
        cy.mount(<Circle hidden={true} width="100px" height="100px" lineHeight="100px" backgroundImgURL="https://cdn-icons-png.flaticon.com/512/84/84042.png"/>);
        cy.get('div').should('not.have.css', 'background-image');
    });
});