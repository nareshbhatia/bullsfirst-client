const user = {
  name: 'John Smith',
  email: 'jsmith@example.com',
  password: 'let-me-in',
};

describe('Authentication', function () {
  it('allows user to sign up, sign out and sign in', function () {
    // Go to home page
    cy.visit('/');

    // Home Page: Click on sign in button
    cy.contains('Sign in').click();

    // SignIn: Fill out sign in form and submit
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('Sign in').click();

    // Verify navigation to Accounts Page
    cy.contains('Bullsfirst');
  });
});
