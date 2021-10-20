import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
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
import { GetUserDocument } from './graphql';

export const App = () => {
  const { authState, setAuthState } = useAuthContext();
  const { data } = useQuery(GetUserDocument, {
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
      <Route
        path="/accounts"
        element={
          <PrivateRoute redirectPath="/signin" element={<AccountsPage />} />
        }
      >
        <Route path=":accountId" element={<AccountView />}>
          <Route path="overview" element={<Overview />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="activity" element={<Activity />} />
        </Route>
      </Route>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
