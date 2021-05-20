import { AuthService } from './AuthService';

const accessToken = '1234';

const signInRedirectPath = '/manage/headlines';

describe('AuthService', () => {
  it('allows to manage access token', async () => {
    AuthService.setAccessToken(accessToken);
    expect(AuthService.getAccessToken()).toEqual(accessToken);

    AuthService.removeAccessToken();
    expect(AuthService.getAccessToken()).toBeUndefined();
  });

  it('allows to manage sign in redirect path', async () => {
    AuthService.setSignInRedirectPath(signInRedirectPath);
    expect(AuthService.getSignInRedirectPath()).toEqual(signInRedirectPath);

    AuthService.removeSignInRedirectPath();
    expect(AuthService.getSignInRedirectPath()).toEqual('/accounts');
  });
});
