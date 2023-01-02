import Review from "./review";
import { millisecondsToDate } from "../utils/millisecondsToDate";
import { createMockUser } from "../utils/test-utils/createMockUser";

const TIMESTAMP = 1672177414;
const TO_DATE_STRING = millisecondsToDate(1672177414).full;

describe('Review', () => {
    it('should mount', () => {
        cy.mount(<Review id="testID" ratingScore={3} statement="test statement" timestamp={TIMESTAMP} userName="test user" currentUser={createMockUser({ displayName: "different user" })} isEditing={false} setEditingID={cy.spy().as('edit')} saveReview={cy.spy().as('save')} deleteReview={cy.spy().as('delete')} />);
        cy.dataCy('ratingScore').contains('★★★');
        cy.dataCy('statement').contains('test statement');
        cy.dataCy('toDateString').contains(TO_DATE_STRING);
        cy.dataCy('userName').contains("test user");
        cy.get('svg').should('not.exist');
        cy.get('newStatement').should('not.exist');
    });

    it('should render icons when the same user is logged in', () => {
        cy.mount(<Review id="testID" ratingScore={3} statement="test statement" timestamp={TIMESTAMP} userName="test user" currentUser={createMockUser({ displayName: "test user" })} isEditing={false} setEditingID={cy.spy().as('edit')} saveReview={cy.spy().as('save')} deleteReview={cy.spy().as('delete')} />);
        cy.dataCy('AiOutlineCheckSquare').should('not.exist');
        cy.dataCy('BiEdit').click();
        cy.get('@edit').should('have.been.called');
        cy.dataCy('BsTrash').click();
        cy.get('@delete').should('have.been.called');
    });

    it('different icons and newStatement should be rendered when editing', () => {
        cy.mount(<Review id="testID" ratingScore={3} statement="test statement" timestamp={TIMESTAMP} userName="test user" currentUser={createMockUser({ displayName: "test user" })} isEditing={true} setEditingID={cy.spy().as('edit')} saveReview={cy.spy().as('save')} deleteReview={cy.spy().as('delete')} />);
        cy.dataCy('newStatement').should('exist');
        cy.dataCy('statement').should('not.exist');
        cy.dataCy('AiOutlineCheckSquare').click();
        cy.get('@save').should('have.been.called');
        cy.dataCy('BiEdit').should('not.exist');
    });
});