const user = {
  firstName: "Big",
  lastName: "Baby",
  email: "bb@gmail.com",
  username: "bby",
  password: "B!1bbbbb"
}


describe('User Authentication', async () => {
  beforeEach(() => {
    cy.visit("/api/auth/signout");
    cy.visit("/");
    cy.task('removeUserByEmail', user.email);
  });

  it('New user should be able to signup for an account', () => {
    // Arrange
    cy.visit("/auth/signup");

    // Act
    cy.inputSignup(user.firstName, user.lastName, user.email, user.username, user.password);

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

  ["/auth/login", "/api/auth/signin"].forEach((url) => {
    it('Registered user should be able to login', () => {
      // Arrange
      cy.task('insertUser', user);
      cy.visit("/auth/login");

      // Act
      cy.inputLogin(user.email, user.password);

      // Assert
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.get('nav').contains('Sign Out');
    });
  });

  ["/auth/login", "/api/auth/signin"].forEach((url) => {
    it('Logged in user should be able to sign out', () => {
      // Arrange
      cy.task('insertUser', user);
      cy.visit(url);
      cy.inputLogin(user.email, user.password);

      // Act
      cy.get('nav').contains('Sign Out').click();

      // Assert
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.get('nav').contains('Sign Up');
      cy.get('nav').contains('Login');
    });
  });

  ["/auth/login", "/api/auth/signin"].forEach(url => {
    it('Logged in user should be able to sign out by url', () => {
      // Arrange
      cy.task('insertUser', user);
      cy.visit(url);
      cy.inputLogin(user.email, user.password);

      // Act
      cy.visit("/auth/signout");

      // Assert
      cy.location('pathname').should('eq', '/auth/signup');
      cy.get('nav').contains('Sign Up');
      cy.get('nav').contains('Login');
    });
  });
});
