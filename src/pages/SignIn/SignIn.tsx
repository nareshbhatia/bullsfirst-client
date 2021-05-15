import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { Credentials } from '../../models';
import { SignInForm } from './SignInForm';

export const SignIn = () => {
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState<string | undefined>(undefined);

  /* istanbul ignore next */
  const handleSubmit = async (credentials: Credentials) => {
    navigate('/accounts');
  };

  return (
    <ViewVerticalContainer>
      <div className="flex-grow-1" />
      <SignInForm signInError={signInError} onSubmit={handleSubmit} />
      <div className="flex-grow-2" />
    </ViewVerticalContainer>
  );
};
