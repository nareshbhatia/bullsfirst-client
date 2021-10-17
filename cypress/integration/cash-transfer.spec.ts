const baseUrl = 'http://localhost:3000';

describe('Cash Transfer', function () {
  it('allows transfer out if funds are available', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);

    // Overview Tab: Click on Transfer button
    cy.contains('Transfer').click();

    // Verify that Transfer Dialog opens
    cy.contains('TRANSFER IN');
    cy.get('[data-testid="transfer-account"]').contains('Brokerage Account');

    // Transfer Dialog: Switch to transfer out
    cy.get('[data-testid="direction-toggle-button"]').click();
    cy.contains('TRANSFER OUT');

    // Enter amount and submit
    cy.get('input[name="amount"]').type('1000');
    cy.contains('Submit').click();

    // Verify that success message opens
    cy.contains('SUCCESS');

    // Click on "View Transactions"
    cy.contains('View Transactions').click();

    // Verify that app navigates to activity tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/activity`);
  });

  it('does not allow transfer out if funds are not available', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);

    // Overview Tab: Click on Transfer button
    cy.contains('Transfer').click();

    // Verify that Transfer Dialog opens
    cy.contains('TRANSFER IN');
    cy.get('[data-testid="transfer-account"]').contains('Brokerage Account');

    // Transfer Dialog: Switch to transfer out
    cy.get('[data-testid="direction-toggle-button"]').click();
    cy.contains('TRANSFER OUT');

    // Enter amount and submit
    cy.get('input[name="amount"]').type('20000');
    cy.contains('Submit').click();

    // Verify that error message opens
    cy.contains('ERROR');
    cy.contains('Insufficient funds');

    // Click on "Close"
    cy.contains('Close').click();

    // Verify that error message is closed
    cy.contains('ERROR').should('not.exist');
  });
});

// Convert this to a module instead of script (allows import/export)
export {};
