/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.addAll({
    inputSignup(firstName, lastName, email, username, password) {
        cy.get('input[id="first-name"]').type(firstName);
        cy.get('input[id="last-name"]').type(lastName);
        cy.get('input[id="email"]').type(email);
        cy.get('input[id="email-confirmation"]').type(email);
        cy.get('input[id="username"]').type(username);
        cy.get('input[id="password"]').type(password);
        cy.get('input[id="password-confirmation"]').type(password);
        cy.get('button[type="submit"]').click();
    },
    inputLogin(email, password) {
        cy.get('input[id="email"]').type(email);
        cy.get('input[id="password"]').type(password);
        cy.get('button[type="submit"]').click();
    },
});