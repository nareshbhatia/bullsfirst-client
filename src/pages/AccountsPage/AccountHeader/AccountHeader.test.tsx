import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render } from '../../../test/test-utils';
import { TransferContextProvider } from '../TransferDialog';
import { AccountHeader } from './AccountHeader';

describe('AccountHeader', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <RefreshContextProvider>
        <TransferContextProvider>
          <AccountHeader />
        </TransferContextProvider>
      </RefreshContextProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
