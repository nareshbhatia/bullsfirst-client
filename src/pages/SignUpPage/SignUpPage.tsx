import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthContext } from '../../contexts';
import { AuthService } from '../../services';
import { SignUpDocument } from '../../graphql';
import { SignUpForm, FormEntity } from './SignUpForm';

export const SignUpPage = () => {
  const { authState, setAuthState } = useAuthContext();
  const navigate = useNavigate();
  const [signUp, { error }] = useMutation(SignUpDocument);

  // redirect if user is already logged in
  /* istanbul ignore next */
  useEffect(() => {
    if (authState.user) {
      navigate('/accounts');
    }
  }, [authState.user, navigate]);

  /* istanbul ignore next */
  const handleSubmit = async (formEntity: FormEntity) => {
    try {
      const { confirmPassword, ...signUpInput } = formEntity;
      const result = await signUp({ variables: { signUpInput } });
      if (result.data) {
        const { user, accessToken } = result.data.signUp;
        AuthService.setAccessToken(accessToken);
        // navigate before setting authState to avoid saving incorrect signInRedirect
        navigate('/accounts');
        setAuthState({ ...authState, user });
      }
    } catch (e) {
      // eat error because it is already captured in useMutation result
    }
  };

  return (
    <ViewVerticalContainer>
      <div className="flex-grow-1" />
      <SignUpForm signUpError={error?.message} onSubmit={handleSubmit} />
      <div className="flex-grow-2" />
    </ViewVerticalContainer>
  );
};
