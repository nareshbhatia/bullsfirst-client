import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthContext } from '../../contexts';
import { UserInfo } from '../../models';
import { AuthService } from '../../services';
import { SignUpForm, FormEntity } from './SignUpForm';

interface UserInfoData {
  signUp: UserInfo;
}

const SIGN_UP = gql`
  mutation SignUp($signUpInput: SignUpInput) {
    signUp(signUpInput: $signUpInput) {
      user {
        id
        name
        email
      }
      accessToken
    }
  }
`;

export const SignUp = () => {
  const { authState, setAuthState } = useAuthContext();
  const navigate = useNavigate();
  const [signUp, { data, error }] = useMutation<UserInfoData>(SIGN_UP);
  const signUpError = error ? error.message : undefined;

  // redirect if user is already logged in
  /* istanbul ignore next */
  useEffect(() => {
    if (authState.user) {
      navigate('/accounts');
    }
  }, [authState.user, navigate]);

  // set authState if user has signed up successfully
  /* istanbul ignore next */
  useEffect(() => {
    if (data?.signUp) {
      const { user, accessToken } = data.signUp;
      AuthService.setAccessToken(accessToken);
      // navigate before setting authState to avoid saving incorrect signInRedirect
      navigate('/accounts');
      setAuthState({ ...authState, user });
    }
  }, [data?.signUp, authState, setAuthState, navigate]);

  /* istanbul ignore next */
  const handleSubmit = async (formEntity: FormEntity) => {
    const { confirmPassword, ...signUpInput } = formEntity;
    await signUp({ variables: { signUpInput } });
  };

  return (
    <ViewVerticalContainer>
      <div className="flex-grow-1" />
      <SignUpForm signUpError={signUpError} onSubmit={handleSubmit} />
      <div className="flex-grow-2" />
    </ViewVerticalContainer>
  );
};
