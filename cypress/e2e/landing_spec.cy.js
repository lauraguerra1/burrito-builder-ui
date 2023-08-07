describe("landing page spec", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'burritos'
    }).as('getOrders')
    .visit('http://localhost:3000')
  })
  it("should have two orders and a form", () => {
    cy.wait('@getOrders').then((interception) => {
      cy.get('h1').contains('Burrito Builder')
        .get('form').children().should('have.length', 15)
        .get('form > p').contains('Order: Nothing selected')
        .get('.order').should('have.length', 2)
        .checkButtons([
          "beans",
          "steak",
          "carnitas",
          "sofritas",
          "lettuce",
          "queso fresco",
          "pico de gallo",
          "hot sauce",
          "guacamole",
          "jalapenos",
          "cilantro",
          "sour cream",
          "Submit Order"
        ])
        .get('h3').first().contains('Nik')
        .get('.ingredient-list').first().children().first().contains('sofritas')
        .get('.ingredient-list').first().children().last().contains('hot sauce')
        .get('h3').last().contains('Heather')
        .get('.ingredient-list').last().children().first().contains('steak')
        .get('.ingredient-list').last().children().next().contains('guacamole')
        .get('.ingredient-list').last().children().last().contains('jalapenos')
    })
  });
});

// cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
//       statusCode: 201, 
//       fixture: 'newBurrito'
//     }).as('postOrder')
// .get('input').type('laura')
// .get('button').first().click()
// .get('button').last().click()
// .wait('@postOrder').then((interception) => {

// })