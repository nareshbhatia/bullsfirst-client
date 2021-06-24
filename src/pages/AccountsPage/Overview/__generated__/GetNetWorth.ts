/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNetWorth
// ====================================================

export interface GetNetWorth_netWorthInfo {
  __typename: 'NetWorthInfo';
  netWorth: number;
  investments: number;
  cash: number;
}

export interface GetNetWorth {
  /**
   * returns the net worth for the specified account
   */
  netWorthInfo: GetNetWorth_netWorthInfo;
}

export interface GetNetWorthVariables {
  accountId: string;
}
