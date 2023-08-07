describe('error handling spec', () => {
  it('should check that orders cannot be submitted without a name and at least one ingredient', () => {
    cy.stubSingleFetch('GET', 200, 'burritos', 'getOrders')
      .visit('http://localhost:3000')
      .wait('@getOrders').then((interception) => {
      cy.get('input').should('have.attr', 'required')
      .get('input').type('Laura')
      .get('button').contains('Submit Order').click()
      .get('.submission-error').contains('Please select at least one ingredient!')
    })
  })

  it('should display a 400 level error when getting orders', () => {
    cy.stubSingleFetch('GET', 404, 'burritos', 'getOrders')
      .visit('http://localhost:3000')
      .wait('@getOrders').then((interception) => {
      cy.get('h2').contains('Error: 404 - Please try again')
    })
  })

  it('should display a 500 level error when getting orders', () => {
    cy.stubSingleFetch('GET', 500, 'burritos', 'getOrders')
      .visit('http://localhost:3000')
      .wait('@getOrders').then((interception) => {
      cy.get('h2').contains('Error: 500 - Please try again')
    })
  })

  it('should display a 400 level error when posting orders', () => {
    cy.stubSingleFetch('GET', 200, 'burritos', 'getOrders')
    cy.stubSingleFetch('POST', 404, 'burritos', 'postOrder')
    cy.visit('http://localhost:3000')
      .wait('@getOrders').then((interception) => {
      cy.get('input').type('Laura')
      .get('button').contains('beans').click()
      .get('button').contains('Submit Order').click()
      .wait('@postOrder').then((interception) => {
        cy.get('h2').contains('Error: 404 - Please try again')
      })
    })
  })

  it('should display a 500 level error when posting orders', () => {
    cy.stubSingleFetch('GET', 200, 'burritos', 'getOrders')
    cy.stubSingleFetch('POST', 500, 'burritos', 'postOrder')
    cy.visit('http://localhost:3000')
      .wait('@getOrders').then((interception) => {
      cy.get('input').type('Laura')
      .get('button').contains('beans').click()
      .get('button').contains('Submit Order').click()
      .wait('@postOrder').then((interception) => {
        cy.get('h2').contains('Error: 500 - Please try again')
      })
    })
  })
})