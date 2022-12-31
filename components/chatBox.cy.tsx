import ChatBox from "./chatBox";
import { millisecondsToDate } from "../utils/millisecondsToDate";

const TEST_IMAGE_URL = "https://cdn-icons-png.flaticon.com/512/84/84042.png";
const TIMESTAMP = 1672177414;
const HOURS = millisecondsToDate(1672177414).hours;
const MINUTES = millisecondsToDate(1672177414).minutes;

describe('ChatBox', () => {
    it('should mount', () => {
        cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage={TEST_IMAGE_URL} timestamp={TIMESTAMP} isProfileHidden={false} isLast={false} />);
        cy.dataCy('renderingLeft');
        cy.dataCy('text').contains('Test');
        cy.dataCy('userName').contains('Test user');
        cy.dataCy('circle').should('have.attr', 'background-image', `url("${TEST_IMAGE_URL}")`);

        cy.get('div').closest('.circle_circle__bK0F7').should('have.attr', 'style', 'width: 30px; height: 30px; line-height: 30px; border: 1px solid black; background-image: url("https://cdn-icons-png.flaticon.com/512/84/84042.png");');
        cy.get('small').contains(HOURS);
        cy.get('small').contains(MINUTES);
        cy.get('div').should('not.have.id', 'last');
    });

    // it('when renderingDirection is right, renderingRight style should be applied and, userName and Circle component should not be rendered', () => {
    //     cy.mount(<ChatBox renderingDirection="right" text="Test" userName="Test user" userImage={TEST_IMAGE_URL} timestamp={TIMESTAMP} isProfileHidden={false} isLast={false} />);
    //     cy.get('div').should('have.class', 'chatBox_renderingRight__BlACr');
    //     cy.get('span').contains('Test');
    //     cy.get('small').should('not.contain','Test user');
    //     cy.get('div').should('not.have.class', '.circle_circle__bK0F7');
    //     cy.get('small').contains(hours);
    //     cy.get('small').contains(minutes);
    //     cy.get('div').should('not.have.id', 'last');
    // });

    // it('when isProfileHidden is true, hidden prop in Circle component should be set true and userName should not be rendered', () => {
    //     cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage={TEST_IMAGE_URL} timestamp={TIMESTAMP} isProfileHidden={true} isLast={false} />);
    //     cy.get('div').closest('.circle_circle__bK0F7').should('have.attr', 'style', 'width: 30px; height: 30px; line-height: 30px; border: 1px solid white;');
    //     cy.get('small').should('not.contain','Test user');
    // });

    // it('when isLast is true, div element containing "last" as id should be rendered', () => {
    //     cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage={TEST_IMAGE_URL} timestamp={TIMESTAMP} isProfileHidden={true} isLast={true} />);
    //     cy.get('#last');
    // });
});