const firstName = "Big";
const lastName = "Baby"
const email = "bb@gmail.com";
const username = "bby";
const password = "B!1bbbbb";


describe('signup', async () => {
  it('New user should be able to signup for an account', async () => {
    // Arrange
    // cy.exec('npx prisma migrate reset --force');
    cy.task('removeUserByEmail', email);
    cy.visit("/auth/signup");

    // Act
    cy.get('input[id="first-name"]').type(firstName);
    cy.get('input[id="last-name"]').type(lastName);
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="email-confirmation"]').type(email);
    cy.get('input[id="username"]').type(username);
    cy.get('input[id="password"]').type(password);
    cy.get('input[id="password-confirmation"]').type(password);
    cy.get('button[type="submit"]').click();

    // Assert
    cy.url().should('include', 'auth/login');
  });
});
