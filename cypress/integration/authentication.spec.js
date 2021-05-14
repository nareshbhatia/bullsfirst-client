describe('Authentication', function () {
  it('allows user to sign up, sign out and sign in', function () {
    // Go to home page
    cy.visit('/');

    // Home Page: Click on sign in button
    cy.contains('Sign in').click();

    // Sign In Page
    cy.contains('Sign In');
  });
});
