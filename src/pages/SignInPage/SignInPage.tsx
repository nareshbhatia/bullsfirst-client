import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthContext } from '../../contexts';
import { Credentials, SignInDocument } from '../../graphql';
import { AuthService } from '../../services';
import { SignInForm } from './SignInForm';

export const SignInPage = () => {
  const { authState, setAuthState } = useAuthContext();
  const navigate = useNavigate();
  const [signIn, { error }] = useMutation(SignInDocument);

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

  /* istanbul ignore next */
  const handleSubmit = async (credentials: Credentials) => {
    try {
      const result = await signIn({ variables: { credentials } });
      if (result.data) {
        const { user, accessToken } = result.data.signIn;
        AuthService.setAccessToken(accessToken);
        setAuthState({ ...authState, user });
      }
    } catch (e) {
      // eat error because it is already captured in useMutation result
    }
  };

  return (
    <ViewVerticalContainer>
      <div className="flex-grow-1" />
      <SignInForm signInError={error?.message} onSubmit={handleSubmit} />
      <div className="flex-grow-2" />
    </ViewVerticalContainer>
  );
};
