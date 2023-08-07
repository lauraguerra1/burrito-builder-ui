describe("landing page spec", () => {
  it("should have two orders and a form", () => {
    cy.stubSingleFetch('GET', 200, 'burritos', 'getOrders')
      .visit('http://localhost:3000')
      .wait('@getOrders').then((interception) => {
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
