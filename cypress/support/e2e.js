import 'cypress-axe';

Cypress.Commands.add('checkA11yPage', () => {
  cy.injectAxe();
  cy.checkA11y(); 
});
