/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  __typename: 'User';
  name: string;
  email: string;
}

export interface GetUser {
  /**
   * returns the user identified by the access token in the request header
   */
  user: GetUser_user;
}
