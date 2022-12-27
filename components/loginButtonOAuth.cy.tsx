import LoginButtonOAuth from "./loginButtonOAuth";
import { BsFillQuestionOctagonFill } from "react-icons/bs";

describe('LoginButtonOAuth', () => {
    it('should mount', () => {
        cy.mount(<LoginButtonOAuth provider="Test" icon={<BsFillQuestionOctagonFill size={25} />} signInWithProvider={() => { }} />);
        cy.get('button').find('div').find('svg');
        cy.get('span').contains('Sign in with Test');
    });

    it('when button is clicked, should call signInWithProvider', () => {
        cy.mount(<LoginButtonOAuth provider="Test" icon={<BsFillQuestionOctagonFill size={25} />} signInWithProvider={cy.spy().as('signInWithProvider')} />);
        cy.get('button').click();
        cy.get('@signInWithProvider').should('have.been.called');
    });
});