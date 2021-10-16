import React from 'react';
import { render, screen } from '../../test/test-utils';
import { AccountsPage } from './AccountsPage';

describe('Accounts', () => {
  it('renders accounts in the sidebar', async () => {
    render(<AccountsPage />);
    const sidebar = await screen.findByTestId('sidebar');
    const navItems = sidebar.querySelectorAll('li.sidebar__item');

    // expect 3 accounts from mock server
    expect(navItems.length).toBe(3);
  });
});
