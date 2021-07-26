const baseUrl = 'http://localhost:3000';

describe('Trade Button', function () {
  it('allows user to place a buy order at market price', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);

    // Overview Tab: Click on Trade button
    cy.contains('Trade').click();

    // Verify that Order Dialog opens
    cy.contains('BUY');
    cy.get('[data-testid="order-account"').contains('Brokerage Account');

    // Enter order details and submit

    // Note: it is very difficult to choose an option from react-select:
    // cy.get('input[id="security"]').type('AAPL');
    // cy.contains('AAPL (Apple Inc)').click({ force: true });
    // Hence we are waiting for 100ms and pressing enter
    cy.get('input[id="security"]')
      .focus()
      .type('AAPL')
      .wait(100)
      .type('{enter}');

    cy.get('input[name="quantity"]').type('10');
    cy.contains('Submit').click();

    // Verify that success message opens
    cy.contains('SUCCESS');

    // Click on "View Orders"
    cy.contains('View Orders').click();

    // Verify that app navigates to orders tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/orders`);
  });

  it('allows user to place a sell order at market price', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);

    // Overview Tab: Click on Trade button
    cy.contains('Trade').click();

    // Verify that Order Dialog opens
    cy.contains('BUY');
    cy.get('[data-testid="order-account"').contains('Brokerage Account');

    // Order Dialog: Switch to sell
    cy.get('[data-testid="side-toggle-button"').click();
    cy.contains('SELL');

    // Enter order details and submit
    cy.get('input[id="security"]')
      .focus()
      .type('AAPL')
      .wait(100)
      .type('{enter}');
    cy.get('input[name="quantity"]').type('10');
    cy.contains('Submit').click();

    // Verify that success message opens
    cy.contains('SUCCESS');
  });

  it('allows user to place a sell order at limit price', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);

    // Overview Tab: Click on Trade button
    cy.contains('Trade').click();

    // Verify that Order Dialog opens
    cy.contains('BUY');
    cy.get('[data-testid="order-account"').contains('Brokerage Account');

    // Order Dialog: Switch to sell
    cy.get('[data-testid="side-toggle-button"').click();
    cy.contains('SELL');

    // Enter order details and submit
    cy.get('input[id="security"]')
      .focus()
      .type('AAPL')
      .wait(100)
      .type('{enter}');
    cy.get('input[name="quantity"]').type('10');
    cy.contains('Limit').click();
    cy.get('input[name="limitPrice"]').type('130');
    cy.contains('Submit').click();

    // Verify that success message opens
    cy.contains('SUCCESS');
  });

  it('shows an error if there are not sufficient funds for a buy market order', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);

    // Overview Tab: Click on Trade button
    cy.contains('Trade').click();

    // Verify that Order Dialog opens
    cy.contains('BUY');
    cy.get('[data-testid="order-account"').contains('Brokerage Account');

    // Enter order details and submit
    cy.get('input[id="security"]')
      .focus()
      .type('AAPL')
      .wait(100)
      .type('{enter}');
    cy.get('input[name="quantity"]').type('1000');
    cy.contains('Submit').click();

    // Verify that error message opens
    cy.contains('ERROR');
    cy.contains('Insufficient funds');
  });

  it('shows an error if there is not sufficient quantity for a sell market order', function () {
    cy.signupJohnSmith();

    // Verify that app navigates to overview tab
    cy.url().should('eq', `${baseUrl}/accounts/brokerage-account/overview`);

    // Overview Tab: Click on Trade button
    cy.contains('Trade').click();

    // Verify that Order Dialog opens
    cy.contains('BUY');
    cy.get('[data-testid="order-account"').contains('Brokerage Account');

    // Order Dialog: Switch to sell
    cy.get('[data-testid="side-toggle-button"').click();
    cy.contains('SELL');

    // Enter order details and submit
    cy.get('input[id="security"]')
      .focus()
      .type('AAPL')
      .wait(100)
      .type('{enter}');
    cy.get('input[name="quantity"]').type('1001');
    cy.contains('Submit').click();

    // Verify that error message opens
    cy.contains('ERROR');
    cy.contains('Insufficient shares of AAPL in your account');

    // Close the error message
    cy.contains('Close').click();
  });
});
