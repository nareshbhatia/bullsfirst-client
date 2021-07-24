import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render } from '../../../test/test-utils';
import { OrderContextProvider } from '../OrderDialog';
import { TransferContextProvider } from '../TransferDialog';
import { AccountHeader } from './AccountHeader';

describe('AccountHeader', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <RefreshContextProvider>
        <OrderContextProvider>
          <TransferContextProvider>
            <AccountHeader />
          </TransferContextProvider>
        </OrderContextProvider>
      </RefreshContextProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
