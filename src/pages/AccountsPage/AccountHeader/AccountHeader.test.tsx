import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render } from '../../../test/test-utils';
import { AccountHeader } from './AccountHeader';

describe('AccountHeader', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <RefreshContextProvider>
        <AccountHeader />
      </RefreshContextProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
