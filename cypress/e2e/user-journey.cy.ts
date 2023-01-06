describe('User should be able to view reviews', () => {
  it('successfully view reviews', () => {
    cy.visit("/");
    cy.get('button').contains('Start').click();
    cy.get('button').contains('Sushi').click();
    cy.get('button').contains('sushi1').click();
    cy.wait(5000);
    cy.scrollTo('bottom');
    cy.dataCy('reviewContainer').should('exist');
  })
})

describe('User should be able to login', () => {
  it('successfully login', () => {
    cy.visit("/login");
    cy.get(':nth-child(1) > [data-cy="control"]').type('test@email.com');
    cy.get(':nth-child(2) > [data-cy="control"]').type('123456');
    cy.get('form').contains('Login').click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'http://localhost:3000/dashboard'
      )
    });
    cy.contains('test@email.com').should('exist');
  })
})

describe('User should be able to chat', () => {
  it('successfully chat', () => {
    cy.visit("/chat");
  })
})

export { }