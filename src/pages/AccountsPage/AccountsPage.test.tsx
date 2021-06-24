import React from 'react';
import { render } from '../../test/test-utils';
import { AccountsPage } from './AccountsPage';

describe('Accounts', () => {
  it('renders accounts in the sidebar', async () => {
    const { findByTestId } = render(<AccountsPage />);
    const sidebar = await findByTestId('sidebar');
    const navItems = sidebar.querySelectorAll('li.sidebar__item');

    // expect 3 accounts from mock server
    expect(navItems.length).toBe(3);
  });
});
