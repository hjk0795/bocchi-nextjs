import GridCardCarousel from "./gridCardCarousel";

const TEST_IMAGE_URL_1 = "https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07";
const TEST_IMAGE_URL_2 = "https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F2.png?alt=media&token=a8f42a52-e492-4a7d-a6b6-ceaeec54277d";

describe('GridCardCarousel', () => {
    it('should mount', () => {
        cy.mount(<GridCardCarousel imgURLArray={[TEST_IMAGE_URL_1]} />);
        cy.get('img').should('have.attr', 'src', TEST_IMAGE_URL_1).and('have.attr', 'alt', 'Image 1').and('have.css', 'height', '200px');
    });

    it('imgAlt should be inserted in alt attribute in img element', () => {
        cy.mount(<GridCardCarousel imgURLArray={[TEST_IMAGE_URL_1, TEST_IMAGE_URL_2]} imgAlt="testAlt" />);
        cy.get('img').should(($img) => {
            expect($img).to.have.length(2);
            expect($img.eq(0)).to.have.attr('alt', 'testAlt 1').to.have.attr('src', TEST_IMAGE_URL_1);
            expect($img.eq(1)).to.have.attr('alt', 'testAlt 2').to.have.attr('src', TEST_IMAGE_URL_2);
        })
    });

    it('different style should be applied when isBigSize is true', () => {
        cy.mount(<GridCardCarousel imgURLArray={[TEST_IMAGE_URL_1, TEST_IMAGE_URL_2]} imgAlt="testAlt" isBigSize={true} />);
        cy.get('img').should('not.have.css', 'height', '200px');
    });
});