import ChatBox from "./chatBox";
import { millisecondsToDate } from "../utils/millisecondsToDate";

const TIMESTAMP = 1672177414;
const hours = millisecondsToDate(1672177414).hours;
const minutes = millisecondsToDate(1672177414).minutes;

describe('ChatBox', () => {
    it('should mount', () => {
        cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage="https://cdn-icons-png.flaticon.com/512/84/84042.png" timestamp={TIMESTAMP} isProfileHidden={false} isLast={false} />);
        cy.get('div').should('have.class', 'chatBox_renderingLeft__rEECD');
        cy.get('span').contains('Test');
        cy.get('small').contains('Test user');
        cy.get('div').closest('.circle_circle__bK0F7').should('have.attr', 'style', 'width: 30px; height: 30px; line-height: 30px; border: 1px solid black; background-image: url("https://cdn-icons-png.flaticon.com/512/84/84042.png");');
        cy.get('small').contains(hours);
        cy.get('small').contains(minutes);
        cy.get('div').should('not.have.id', 'last');
    });

    it('when renderingDirection is right, renderingRight style should be applied and, userName and Circle component should not be rendered', () => {
        cy.mount(<ChatBox renderingDirection="right" text="Test" userName="Test user" userImage="https://cdn-icons-png.flaticon.com/512/84/84042.png" timestamp={TIMESTAMP} isProfileHidden={false} isLast={false} />);
        cy.get('div').should('have.class', 'chatBox_renderingRight__BlACr');
        cy.get('span').contains('Test');
        cy.get('small').should('not.contain','Test user');
        cy.get('div').should('not.have.class', '.circle_circle__bK0F7');
        cy.get('small').contains(hours);
        cy.get('small').contains(minutes);
        cy.get('div').should('not.have.id', 'last');
    });

    it('when isProfileHidden is true, hidden prop in Circle component should be set true and userName should not be rendered', () => {
        cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage="https://cdn-icons-png.flaticon.com/512/84/84042.png" timestamp={TIMESTAMP} isProfileHidden={true} isLast={false} />);
        cy.get('div').closest('.circle_circle__bK0F7').should('have.attr', 'style', 'width: 30px; height: 30px; line-height: 30px; border: 1px solid white;');
        cy.get('small').should('not.contain','Test user');
    });

    it('when isLast is true, div element containing "last" as id should be rendered', () => {
        cy.mount(<ChatBox renderingDirection="left" text="Test" userName="Test user" userImage="https://cdn-icons-png.flaticon.com/512/84/84042.png" timestamp={TIMESTAMP} isProfileHidden={true} isLast={true} />);
        cy.get('#last');
    });
});