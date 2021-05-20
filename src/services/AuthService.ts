import { Storage } from '../utils';

const TOKEN_KEY = 'accessToken';
const SIGN_IN_REDIRECT_KEY = 'signInRedirect';

const getAccessToken = () => {
  return Storage.get(TOKEN_KEY);
};

const setAccessToken = (accessToken: string) => {
  return Storage.set(TOKEN_KEY, accessToken);
};

const removeAccessToken = () => {
  return Storage.remove(TOKEN_KEY);
};

const getSignInRedirectPath = () => {
  return Storage.get(SIGN_IN_REDIRECT_KEY, '/accounts');
};

const setSignInRedirectPath = (path: string) => {
  return Storage.set(SIGN_IN_REDIRECT_KEY, path);
};

const removeSignInRedirectPath = () => {
  return Storage.remove(SIGN_IN_REDIRECT_KEY);
};

export const AuthService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getSignInRedirectPath,
  setSignInRedirectPath,
  removeSignInRedirectPath,
};
