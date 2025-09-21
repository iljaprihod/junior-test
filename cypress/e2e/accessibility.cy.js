describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.injectAxe(); // встраиваем axe-core
  });

  it('Главная страница не имеет критичных проблем доступности', () => {
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'], // проверяем WCAG 2.0/2.1 A и AA уровни
      },
    });
  });

  it('Страница добавления продукта доступна', () => {
    cy.contains('ADD').click();
    cy.injectAxe();
    cy.checkA11y('form#product_form');
  });

  it('Форма с выбранным DVD доступна', () => {
    cy.contains('ADD').click();
    cy.get('#productType').select('DVD');
    cy.injectAxe();
    cy.checkA11y('#type-specific');
  });

  it('Форма с выбранным Furniture доступна', () => {
    cy.contains('ADD').click();
    cy.get('#productType').select('Furniture');
    cy.injectAxe();
    cy.checkA11y('#type-specific');
  });
});
