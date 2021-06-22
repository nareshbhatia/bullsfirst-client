/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from './../../../graphql-types';

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signUp_user {
  __typename: 'User';
  id: string;
  name: string;
  email: string;
}

export interface SignUp_signUp {
  __typename: 'UserInfo';
  user: SignUp_signUp_user;
  accessToken: string;
}

export interface SignUp {
  /**
   * signs up a new user and returns an access token for future requests
   */
  signUp: SignUp_signUp;
}

export interface SignUpVariables {
  signUpInput: SignUpInput;
}
