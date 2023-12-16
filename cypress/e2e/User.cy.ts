const user = {
  firstName: "Big",
  lastName: "Baby",
  email: "bb@gmail.com",
  username: "bby",
  password: "B!1bbbbb"
}


describe('signup', async () => {
  beforeEach(() => {
    cy.task('removeUserByEmail', user.email);
  });

  it('New user should be able to signup for an account', () => {
    // Arrange
    cy.task('removeUserByEmail', user.email);
    cy.visit("/auth/signup");

    // Act
    cy.get('input[id="first-name"]').type(user.firstName);
    cy.get('input[id="last-name"]').type(user.lastName);
    cy.get('input[id="email"]').type(user.email);
    cy.get('input[id="email-confirmation"]').type(user.email);
    cy.get('input[id="username"]').type(user.username);
    cy.get('input[id="password"]').type(user.password);
    cy.get('input[id="password-confirmation"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // Assert
    cy.url().should('include', 'auth/login');
    cy.task('getUserByEmail', user.email).then((result:any) => {
      const createdUser = result;
      cy.wrap({firstName: createdUser.firstName}).its('firstName').should('eql', user.firstName);
      cy.wrap({lastName: createdUser.lastName}).its('lastName').should('eql', user.lastName);
      cy.wrap({email: createdUser.email}).its('email').should('eql', user.email);
      cy.wrap({username: createdUser.username}).its('username').should('eql', user.username);
      cy.task('compareHash', {string: user.password, hash: createdUser.password}).should('be.true');
    });
  });
});
