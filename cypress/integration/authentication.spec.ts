const baseUrl = 'http://localhost:3000';

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

    // SignIn: Click on sign up button
    cy.contains('Sign up').click();

    // SignUp Page: Fill out sign up form and submit
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);
    cy.contains('Sign up').click();

    // Verify navigation to Accounts Page and
    //   1. navbar shows Bullsfirst brand
    //   2. navbar shows user's name
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);
    cy.contains('Bullsfirst');
    cy.contains(user.name);

    // Accounts Page: Sign out and click on Sign in
    cy.get('svg[aria-labelledby="Sign out"]').click();
    cy.contains('Sign in').click();

    // SignIn Page: Sign in again
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('Sign in').click();

    // Verify navigation to accounts page and
    //   1. navbar shows user's name
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);
    cy.contains(user.name);
  });
});

// Convert this to a module instead of script (allows import/export)
export {};
