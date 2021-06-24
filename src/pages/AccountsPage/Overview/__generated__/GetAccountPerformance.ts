/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccountPerformance
// ====================================================

export interface GetAccountPerformance_accountPerformance_data {
  __typename: 'DataPoint';
  x: number;
  y: number;
}

export interface GetAccountPerformance_accountPerformance {
  __typename: 'Series';
  name: string;
  data: GetAccountPerformance_accountPerformance_data[];
}

export interface GetAccountPerformance {
  /**
   * returns the performance for the specified account
   */
  accountPerformance: GetAccountPerformance_accountPerformance[];
}

export interface GetAccountPerformanceVariables {
  accountId: string;
}
