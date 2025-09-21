
describe('Product List App', () => {
  beforeEach(() => {

    cy.visit('index.html')
  })

  it(() => {
    cy.get('h1').should('contain', 'Product List')
    cy.get('button').contains('ADD').should('exist')
    cy.get('button').contains('MASS DELETE').should('exist')
  })

  it(() => {
    cy.contains('ADD').click()
    cy.get('h1').should('contain', 'Product Add')
    cy.get('form#product_form').should('exist')
  })

  it(() => {
    cy.contains('ADD').click()
    cy.get('#productType').select('DVD')
    cy.get('#type-specific label').should('contain', 'Size (MB):')
  })

  it( () => {
    cy.contains('ADD').click()
    cy.get('#productType').select('Book')
    cy.get('#type-specific label').should('contain', 'Weight (KG):')
  })

  it( () => {
    cy.contains('ADD').click()
    cy.get('#productType').select('Furniture')
    cy.get('#type-specific label').should('contain', 'Height (CM):')
    cy.get('#type-specific label').should('contain', 'Width (CM):')
    cy.get('#type-specific label').should('contain', 'Length (CM):')
  })

  it(() => {
    cy.contains('ADD').click()
    cy.get('#sku').type('SKU123')
    cy.get('#name').type('Test DVD')
    cy.get('#price').type('19.99')
    cy.get('#productType').select('DVD')
    cy.get('#size').type('700')
    cy.contains('SAVE').click()

  
    cy.location('pathname').should('include', 'index.html')
  })

  it( () => {
    cy.contains('ADD').click()
    cy.contains('CANCEL').click()
    cy.get('h1').should('contain', 'Product List')
  })

  it( () => {
    cy.contains('MASS DELETE').click()
    
  })
})
