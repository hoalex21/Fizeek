const user = {
  firstName: "Big",
  lastName: "Baby",
  email: "bb@gmail.com",
  username: "bby",
  password: "B!1bbbbb"
}


describe('User Authentication', () => {
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
      cy.visit(url);

      // Act
      cy.inputLogin(user.email.toUpperCase(), user.password);

      // Assert
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.get('nav').contains('Sign Out');
    });
  });

  it('Logged in user should be able to sign out', () => {
    // Arrange
    cy.task('insertUser', user);
    cy.visit('/auth/login');
    cy.inputLogin(user.email, user.password);

    // Act
    cy.get('nav').contains('Sign Out').click();

    // Assert
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.get('nav').contains('Sign Up');
    cy.get('nav').contains('Log In');
  });

  ["auth/signout", "/api/auth/signout"].forEach((url) => {
    it('Logged in user should be able to sign out by signout url', () => {
      // Arrange
      cy.task('insertUser', user);
      cy.visit('/auth/login');
      cy.inputLogin(user.email, user.password);

      // Act
      cy.visit(url);

      // Assert
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.get('nav').contains('Sign Up');
      cy.get('nav').contains('Log In');
    });
  });

  [
    "/auth/login",
    "/api/auth/signin",
    "/auth/signup"
  ].forEach((url) => {
    it('Logged in user should be restricted from signup and login pages', () => {
      // Arrange
      cy.task('insertUser', user);
      cy.visit('/auth/login');
      cy.intercept('/').as('getHome');
      cy.inputLogin(user.email, user.password);
      cy.wait('@getHome');

      // Act
      cy.visit(url);

      // Assert
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.get('nav').contains('Sign Out');
    });
  });

  it('Signup through need an account', () => {
    // Arrange
    cy.visit('/');
    cy.get('a').contains('Log In').click();
    cy.get('a').contains('here').click();

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

  it('Log in through already have an account', () => {
    // Arrange
    cy.task('insertUser', user);
    cy.visit('/');
    cy.get('a').contains('Sign Up').click();
    cy.get('a').contains('here').click();
    cy.location('pathname').should('eql', '/auth/login');

    // Act
    cy.on('url:changed', (url) => {

    });
    cy.inputLogin(user.email, user.password);

    // Arrange
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.get('nav').contains('Sign Out');
  });
});
