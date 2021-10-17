const baseUrl = 'http://localhost:3000';

describe('Accounts | Overview', function () {
  it('renders overview tab correctly', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);
  });
});

// Convert this to a module instead of script (allows import/export)
export {};
