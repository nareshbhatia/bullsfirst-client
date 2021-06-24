import React, { useCallback, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthContext } from '../../contexts';
import { Credentials } from '../../graphql-types';
import { AuthService } from '../../services';
import { SignInForm } from './SignInForm';
import {
  SignIn as SignInResult,
  SignInVariables,
} from './__generated__/SignIn';

const SIGN_IN = gql`
  mutation SignIn($credentials: Credentials!) {
    signIn(credentials: $credentials) {
      user {
        id
        name
        email
      }
      accessToken
    }
  }
`;

export const SignInPage = () => {
  const { authState, setAuthState } = useAuthContext();
  const navigate = useNavigate();
  const [signIn, { data, error }] = useMutation<SignInResult, SignInVariables>(
    SIGN_IN
  );
  const signInError = error ? error.message : undefined;

  /* istanbul ignore next */
  const navigateToSignInRedirect = useCallback(() => {
    navigate(AuthService.getSignInRedirectPath());
    AuthService.removeSignInRedirectPath();
  }, [navigate]);

  // redirect if user is already logged in
  /* istanbul ignore next */
  useEffect(() => {
    if (authState.user) {
      navigateToSignInRedirect();
    }
  }, [authState.user, navigateToSignInRedirect]);

  // set authState if user has signed in successfully
  /* istanbul ignore next */
  useEffect(() => {
    if (data?.signIn) {
      const { user, accessToken } = data.signIn;
      AuthService.setAccessToken(accessToken);
      setAuthState({ ...authState, user });
    }
  }, [data?.signIn, authState, setAuthState]);

  /* istanbul ignore next */
  const handleSubmit = async (credentials: Credentials) => {
    await signIn({ variables: { credentials } });
  };

  return (
    <ViewVerticalContainer>
      <div className="flex-grow-1" />
      <SignInForm signInError={signInError} onSubmit={handleSubmit} />
      <div className="flex-grow-2" />
    </ViewVerticalContainer>
  );
};