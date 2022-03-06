// cypress-tests.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('<Home/>', () => {
  describe('When you visit home', () => {
    it('should show the title and subtitles', () => {
      cy.visit('/');
      cy.get('[data-cy=styled-heading]').should(
        'have.text',
        'Compare your Air'
      );
      cy.get('[data-cy=styled-subheading]').should(
        'have.text',
        'Compare the air quality between cities in the UK.Select cities to compare using the search tool below.'
      );
    });
  });
  describe('Functionality', () => {
    it('should take an input', () => {
      cy.get('[data-cy=auto-complete-input]').type(`ham`);
    });
    it('should trigger the autocomplete dropdown', () => {
      cy.get('[data-cy=styled-selection-Billingham]').should('be.visible');
      cy.get('[data-cy=styled-selection-Birmingham]').should('be.visible');
      cy.get('[data-cy=styled-selection-Chatham]').should('be.visible');
    });
    it('should select Chatham', () => {
      cy.get('[data-cy=styled-selection-Chatham]').click();
      cy.get('[data-cy=styled-selection-list]').should('not.exist');
    });
    it("should show Chatham's data", () => {
      cy.get('[data-cy="measurement-card-Chatham Roadside"]').should(
        'be.visible'
      );
    });
    it("should dismiss Chatham's card", () => {
      cy.get(
        '[data-cy="measurement-card-remove-button-Chatham Roadside"]'
      ).click();
      cy.get('[data-cy="measurement-card-Chatham Roadside"]').should(
        'not.exist'
      );
    });
  });
  describe('Complex Functionality', () => {
    it('should take an input', () => {
      cy.get('[data-cy=auto-complete-input]').clear().type(`lon`);
    });
    it('should trigger the autocomplete dropdown', () => {
      cy.get('[data-cy=styled-selection-London]').should('be.visible');
    });
    it('should select London', () => {
      cy.get('[data-cy=styled-selection-London]').click();
      cy.get('[data-cy=styled-selection-list]').should('not.exist');
    });
    it("should show London's data", () => {
      cy.get('.measurement-card').should('have.length', 15);
    });
    it('should dismiss London data', () => {
      cy.get(
        '[data-cy="measurement-card-remove-button-Google Street View Car"]'
      ).click();
      cy.get('.measurement-card').should('have.length', 14);
      cy.get('[data-cy="measurement-card-Google Street View Car"]').should(
        'not.exist'
      );
    });
    it("should restore London's cards on a re-entry", () => {
      cy.get('[data-cy=auto-complete-input]').clear().type(`lon`);
      cy.get('[data-cy=styled-selection-London]').click();
      cy.get('.measurement-card').should('have.length', 15);
      cy.get('[data-cy="measurement-card-Google Street View Car"]').should(
        'exist'
      );
    });
  });
});
