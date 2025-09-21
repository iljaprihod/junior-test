describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.injectAxe(); // встраиваем axe-core
  });

  it('main page no problem', () => {
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'], // проверяем WCAG 2.0/2.1 A и AA уровни
      },
    });
  });

  it('add product good', () => {
    cy.contains('ADD').click();
    cy.injectAxe();
    cy.checkA11y('form#product_form');
  });

  it('dvd good', () => {
    cy.contains('ADD').click();
    cy.get('#productType').select('DVD');
    cy.injectAxe();
    cy.checkA11y('#type-specific');
  });

  it('furnuture good', () => {
    cy.contains('ADD').click();
    cy.get('#productType').select('Furniture');
    cy.injectAxe();
    cy.checkA11y('#type-specific');
  });
});
