describe('SignIn page', function () {
  it('shows errors if required fields are not filled', function () {
    // Go to the sign-in page
    cy.visit('/signin');

    // SignIn: Submit without filling any field
    cy.contains('Sign in').click();

    // Verify errors
    cy.contains('email is a required field');
    cy.contains('password is a required field');
  });

  it('shows error if email format is not correct', function () {
    // Go to the sign-in page
    cy.visit('/signin');

    // SignIn: Fill in email field with incorrect email format
    cy.get('input[name="email"]').type('jsmith@example');
    cy.contains('Sign in').click();

    // Verify email validation error
    cy.contains('email must be a valid email');
  });
});

// Convert this to a module instead of script (allows import/export)
export {};
