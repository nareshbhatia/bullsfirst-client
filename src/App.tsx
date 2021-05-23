import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components';
import { useAuthState, useAuthStateSetter } from './contexts';
import {
  Account,
  Accounts,
  Activity,
  Holdings,
  Home,
  NotFound,
  Orders,
  Overview,
  SignIn,
  SignUp,
} from './pages';
import { AuthService } from './services';

const GET_USER = gql`
  query GetUser {
    user {
      name
      email
    }
  }
`;

export const App = () => {
  const authState = useAuthState();
  const setAuthState = useAuthStateSetter();
  const [getUser, { data }] = useLazyQuery(GET_USER);

  // fetch user information on startup
  /* istanbul ignore next */
  useEffect(() => {
    if (!authState.user && AuthService.getAccessToken()) {
      getUser();
    }
  }, [authState.user, getUser]);

  // set authState if getUser returns successfully
  /* istanbul ignore next */
  useEffect(() => {
    if (!authState.user && data?.user) {
      setAuthState({ ...authState, user: data.user });
    }
  }, [data?.user, authState, setAuthState]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <PrivateRoute
        path="/accounts"
        redirectPath="/signin"
        element={<Accounts />}
      >
        <Route path=":accountId" element={<Account />}>
          <Route path="overview" element={<Overview />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="activity" element={<Activity />} />
        </Route>
      </PrivateRoute>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
