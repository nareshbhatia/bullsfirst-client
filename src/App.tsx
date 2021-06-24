import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components';
import { useAuthContext } from './contexts';
import {
  AccountsPage,
  AccountView,
  Activity,
  Holdings,
  HomePage,
  NotFoundPage,
  Orders,
  Overview,
  SignInPage,
  SignUpPage,
} from './pages';
import { AuthService } from './services';
import { GetUser } from './__generated__/GetUser';

export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
    }
  }
`;

export const App = () => {
  const { authState, setAuthState } = useAuthContext();
  const { data } = useQuery<GetUser>(GET_USER, {
    skip:
      authState.user !== undefined ||
      AuthService.getAccessToken() === undefined,
  });

  // set authState if getUser returns successfully
  /* istanbul ignore next */
  useEffect(() => {
    if (!authState.user && data?.user) {
      setAuthState({ ...authState, user: data.user });
    }
  }, [data?.user, authState, setAuthState]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <PrivateRoute
        path="/accounts"
        redirectPath="/signin"
        element={<AccountsPage />}
      >
        <Route path=":accountId" element={<AccountView />}>
          <Route path="overview" element={<Overview />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="activity" element={<Activity />} />
        </Route>
      </PrivateRoute>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
