import React, { useCallback, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthContext } from '../../contexts';
import { Credentials, UserInfo } from '../../models';
import { AuthService } from '../../services';
import { SignInForm } from './SignInForm';

interface UserInfoData {
  signIn: UserInfo;
}

const SIGN_IN = gql`
  mutation SignIn($credentials: Credentials!) {
    signIn(credentials: $credentials) {
      user {
        name
        email
      }
      accessToken
    }
  }
`;

export const SignIn = () => {
  const { authState, setAuthState } = useAuthContext();
  const navigate = useNavigate();
  const [signIn, { data, error }] = useMutation<UserInfoData>(SIGN_IN);
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
