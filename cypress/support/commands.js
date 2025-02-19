// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('checkButtons', (buttons) => {
  buttons.forEach(button => {
    cy.get('button').contains(button).should('be.visible')
  })
})

Cypress.Commands.add('stubSingleFetch', (method, status, fixture, alias) => {
  cy.intercept(method, 'http://localhost:3001/api/v1/orders', {
    statusCode: status, 
    fixture: fixture
  }).as(alias)
})