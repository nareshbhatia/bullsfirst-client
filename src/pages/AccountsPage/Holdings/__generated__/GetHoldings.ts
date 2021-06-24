/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHoldings
// ====================================================

export interface GetHoldings_holdings_security {
  __typename: 'Security';
  id: string;
  name: string;
  price: number;
}

export interface GetHoldings_holdings {
  __typename: 'Holding';
  id: string;
  quantity: number;
  value: number;
  security: GetHoldings_holdings_security;
}

export interface GetHoldings {
  /**
   * returns the holdings for the specified account
   */
  holdings: GetHoldings_holdings[];
}

export interface GetHoldingsVariables {
  accountId: string;
}
