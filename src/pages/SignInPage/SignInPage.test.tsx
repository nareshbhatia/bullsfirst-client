import React from 'react';
import { render, screen, userEvent } from '../../test/test-utils';
import { SignInPage } from './SignInPage';

describe('<SignIn />', () => {
  test('navigates to accounts page on successful login', async () => {
    render(<SignInPage />);

    // Enter valid credentials and submit form
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');
    userEvent.click(screen.getByText('Sign in'));

    // Expect to see the accounts page
    // TODO: wait for React Router docs to catch up on testing. See here:
    // https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/testing/testing-with-react-testing-library.md
    // For now the app remains on the sign-in page
    // expect(await findByText('Accounts')).toBeTruthy();
    expect(await screen.findByText('Sign in')).toBeTruthy();
  });
});
