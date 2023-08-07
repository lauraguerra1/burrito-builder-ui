describe('new order spec', () => {
  it('should create a new order', () => {
    cy.stubSingleFetch('GET', 200, 'burritos', 'getOrders')
    cy.stubSingleFetch('POST', 201, 'newBurrito', 'postOrder')
      .visit('http://localhost:3000')
      .wait('@getOrders').then((interception) => {
        cy.get('input').type('Laura')
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
})

