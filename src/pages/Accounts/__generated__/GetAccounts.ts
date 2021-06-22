/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccounts
// ====================================================

export interface GetAccounts_accounts {
  __typename: 'Account';
  id: string;
  name: string;
}

export interface GetAccounts {
  /**
   * returns the accounts owned by the requesting user
   */
  accounts: GetAccounts_accounts[];
}
