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
        cy.dataCy('circle').should('have.attr', 'style', `width: 30px; height: 30px; line-height: 30px; border: 1px solid black; background-image: url("${TEST_IMAGE_URL}");`);
        cy.dataCy('hours').contains(HOURS);
        cy.dataCy('minutes').contains(MINUTES);
        cy.get('div').should('not.have.id', 'last');
    });

    it('when renderingDirection is right, renderingRight style should be applied and, userName and Circle component should not be rendered', () => {
        cy.mount(<ChatBox renderingDirection="right" text="Test" userName="Test user" userImage={TEST_IMAGE_URL} timestamp={TIMESTAMP} isProfileHidden={false} isLast={false} />);
        cy.dataCy('renderingRight');
        cy.dataCy('circle').should('not.exist');
        cy.dataCy('userName').should('not.exist');
    });

    it('when isProfileHidden is true, hidden prop in Circle component should be set true and userName should not be rendered', () => {
        cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage={TEST_IMAGE_URL} timestamp={TIMESTAMP} isProfileHidden={true} isLast={false} />);
        cy.dataCy('circle').should('have.attr', 'style', 'width: 30px; height: 30px; line-height: 30px; border: 1px solid white;');
        cy.dataCy('userName').should('not.exist');
    });

    it('when isLast is true, div element containing "last" as id should be rendered', () => {
        cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage={TEST_IMAGE_URL} timestamp={TIMESTAMP} isProfileHidden={true} isLast={true} />);
        cy.get('#last').should('exist');
    });
});