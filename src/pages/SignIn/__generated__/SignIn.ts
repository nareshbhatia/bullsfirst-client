/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Credentials } from './../../../graphql-types';

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_signIn_user {
  __typename: 'User';
  name: string;
  email: string;
}

export interface SignIn_signIn {
  __typename: 'UserInfo';
  user: SignIn_signIn_user;
  accessToken: string;
}

export interface SignIn {
  /**
   * signs in the user with the specified credentials and returns an access token for future requests
   */
  signIn: SignIn_signIn;
}

export interface SignInVariables {
  credentials: Credentials;
}
