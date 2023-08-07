describe('error handling spec', () => {
  it('should check that orders cannot be submitted without a name and at least one ingredient', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200, 
      fixture: 'burritos'
    })
      .visit('http://localhost:3000')
      .get('input').should('have.attr', 'required')
      .get('input').type('Laura')
      .get('button').contains('Submit Order').click()
      .get('.submission-error').contains('Please select at least one ingredient!')
  })

  
})