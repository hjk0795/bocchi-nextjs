import ListItemSet from "./listItemSet";
import { AiFillQuestionCircle } from 'react-icons/ai';

describe('ListItemSet', () => {
    it('should mount', () => {
        cy.mount(
            <ListItemSet text="test" icon={<AiFillQuestionCircle />} handleClick={cy.spy().as('handleClick')} />
        )
    });

    it('should have text and icon', () => {
        cy.mount(
            <ListItemSet text="test" icon={<AiFillQuestionCircle />} handleClick={cy.spy().as('handleClick')} />
        )
        cy.contains('test');
        cy.get('svg').should('exist');
    });

    it('should call handleClick when clicked', () => {
        cy.mount(
            <ListItemSet text="test" icon={<AiFillQuestionCircle />} handleClick={cy.spy().as('handleClick')} />
        )
        cy.dataCy('container').click();
        cy.get('@handleClick').should('have.been.called');
    });
});