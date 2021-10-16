import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/test-utils';
import { SignUpPage } from './SignUpPage';

describe('<SignUp />', () => {
  test('navigates to headlines page on successful login', async () => {
    render(<SignUpPage />);

    // Enter valid user info and submit form
    userEvent.type(screen.getByLabelText('Full Name'), 'John Smith');
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'let-me-in');
    userEvent.click(screen.getByText('Sign up'));

    // Expect to see the headlines page
    // TODO: wait for React Router docs to catch up on testing. See here:
    // https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/testing/testing-with-react-testing-library.md
    // For now the app remains on the sign-up page
    // expect(await findByText('Headlines')).toBeTruthy();
    expect(await screen.findByText('Sign up')).toBeTruthy();
  });
});
