import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components';
import { useAuthContext } from './contexts';
import {
  Accounts,
  AccountView,
  Activity,
  Holdings,
  Home,
  NotFound,
  Orders,
  Overview,
  SignIn,
  SignUp,
} from './pages';
import { User } from './models';
import { AuthService } from './services';

interface UserData {
  user: User;
}

export const GET_USER = gql`
  query GetUser {
    user {
      name
      email
    }
  }
`;

export const App = () => {
  const { authState, setAuthState } = useAuthContext();
  const { data } = useQuery<UserData>(GET_USER, {
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
      <Route path="/" element={<Home />} />
      <PrivateRoute
        path="/accounts"
        redirectPath="/signin"
        element={<Accounts />}
      >
        <Route path=":accountId" element={<AccountView />}>
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
