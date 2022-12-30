import AlertToast from "./alertToast";

describe('AlertToast', () => {
    it('should mount', () => {
        cy.mount(<AlertToast title="Test Title" message="Test Message" show={true} setShow={()=>{}}/>);
        cy.dataCy('title').contains('Test Title');
        cy.dataCy('message').contains('Test Message');
    });
});