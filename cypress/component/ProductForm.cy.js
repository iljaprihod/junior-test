import { mount } from 'cypress/react18' // даже для HTML используем mount

describe('add good', () => {
  beforeEach(() => {
    // Берем содержимое из template
    const template = document.createElement('div')
    template.innerHTML = document.getElementById('add-product-template').innerHTML
    mount(template)
  })

  it('shape is good', () => {
    cy.get('form#product_form').should('exist')
    cy.get('#sku').should('exist')
    cy.get('#name').should('exist')
    cy.get('#price').should('exist')
    cy.get('#productType').should('exist')
  })

  it('dvd storage good', () => {
    cy.get('#productType').select('DVD')
    cy.get('#type-specific label').should('contain', 'Size (MB):')
    cy.get('#size').should('exist')
  })

  it('book ok kg', () => {
    cy.get('#productType').select('Book')
    cy.get('#type-specific label').should('contain', 'Weight (KG):')
    cy.get('#weight').should('exist')
  })

  it('furt add good', () => {
    cy.get('#productType').select('Furniture')
    cy.get('#type-specific').within(() => {
      cy.get('label').contains('Height (CM):').should('exist')
      cy.get('label').contains('Width (CM):').should('exist')
      cy.get('label').contains('Length (CM):').should('exist')
    })
  })
})
