import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { render, screen, userEvent } from '../../test/test-utils';
import { SignUpPage } from './SignUpPage';

const MockAccountsPage = () => <div>MockAccountsPage</div>;

describe('<SignUp />', () => {
  test('navigates to accounts page on successful login', async () => {
    render(
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/accounts" element={<MockAccountsPage />} />
      </Routes>
    );

    // Enter valid user info and submit form
    userEvent.type(screen.getByLabelText('Full Name'), 'John Smith');
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'let-me-in');
    userEvent.click(screen.getByText('Sign up'));

    // Expect to see the accounts page
    expect(await screen.findByText('MockAccountsPage')).toBeInTheDocument();
  });
});
