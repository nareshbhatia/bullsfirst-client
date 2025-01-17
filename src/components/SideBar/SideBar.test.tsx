import React from 'react';
import { render, screen, userEvent } from '../../test/test-utils';
import { NavItem, SideBar } from './SideBar';

const handleNavItemSelected = jest.fn();

const items: Array<NavItem> = [
  {
    id: 'brokerage-account',
    name: 'Brokerage Account',
  },
  {
    id: 'retirement-account',
    name: 'Retirement Account',
  },
  {
    id: 'jennys-college-fund',
    name: "Jenny's College Fund",
  },
];

describe('SideBar', () => {
  beforeEach(() => {
    handleNavItemSelected.mockReset();
  });

  it('renders correctly without a title', () => {
    const { asFragment } = render(
      <SideBar
        items={items}
        selectedNavItemId="brokerage-account"
        onNavItemSelected={handleNavItemSelected}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly without items', () => {
    const { asFragment } = render(
      <SideBar
        title="Accounts"
        selectedNavItemId="brokerage-account"
        onNavItemSelected={handleNavItemSelected}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onNavItemSelected when a nav item is clicked', () => {
    render(
      <SideBar
        title="Accounts"
        items={items}
        selectedNavItemId="brokerage-account"
        onNavItemSelected={handleNavItemSelected}
      />
    );

    userEvent.click(screen.getByText('Retirement Account'));
    expect(handleNavItemSelected).toBeCalledWith('retirement-account');
  });
});
