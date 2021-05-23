import React from 'react';
import { render } from '../../test/test-utils';
import { AccountHeader } from './AccountHeader';

describe('AccountHeader', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<AccountHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
