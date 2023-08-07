describe('new order spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'burritos'
    }).as('getOrders')
    .visit('http://localhost:3000')
  })
  
  it('should create a new order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
          statusCode: 201, 
          fixture: 'newBurrito'
        }).as('postOrder')
    .get('input').type('Laura')
    .get('button').contains('beans').click()
    .get('form > p').contains('Order: beans')
    .get('button').contains('queso fresco').click()
    .get('form > p').contains('Order: beans, queso fresco')
    .get('button').contains('Submit Order').click()
    .wait('@postOrder').then((interception) => {
      cy.get('.order').should('have.length', 3)
        .get('h3').last().contains('Laura')
        .get('.ingredient-list').last().children().first().contains('queso fresco')
        .get('.ingredient-list').last().children().last().contains('beans')
    })
  })
})

