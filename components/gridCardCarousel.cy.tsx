import GridCardCarousel from "./gridCardCarousel";

describe('GridCardCarousel', () => {
    it('should mount', () => {
        cy.mount(<GridCardCarousel imgURLArray={["https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07"]} />);
        cy.get('img').should('have.attr', 'src', 'https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07');
        cy.get('img').should('have.attr', 'alt', 'Image 1');
        cy.get('img').should('have.class', 'card-img-top gridCard_cardImg__rj9DO d-block w-100');
    });

    it('imgAlt should be inserted in alt attribute in img element', () => {
        cy.mount(<GridCardCarousel imgURLArray={["https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07", "https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F2.png?alt=media&token=a8f42a52-e492-4a7d-a6b6-ceaeec54277d"]} imgAlt="testAlt" />);
        cy.get('.carousel-inner').find('img').should(($img) => {
            expect($img).to.have.length(2)
            expect($img.eq(0)).to.have.attr('alt', 'testAlt 1').to.have.attr('src', 'https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07');
            expect($img.eq(1)).to.have.attr('alt', 'testAlt 2').to.have.attr('src', 'https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F2.png?alt=media&token=a8f42a52-e492-4a7d-a6b6-ceaeec54277d');
        })
    });

    it('different style should be applied when isBigSize is true', () => {
        cy.mount(<GridCardCarousel imgURLArray={["https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07", "https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F2.png?alt=media&token=a8f42a52-e492-4a7d-a6b6-ceaeec54277d"]} imgAlt="testAlt" isBigSize={true} />);
        cy.get('img').should('have.class', 'card-img-top gridCard_cardImgBigSize__2Npxo d-block w-100');
    });
});