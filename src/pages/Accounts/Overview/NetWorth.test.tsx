import React from 'react';
import { render } from '@testing-library/react';
import { NetWorthInfo } from '../../../models';
import { NetWorth } from './NetWorth';

describe('<NetWorth />', () => {
  test('renders correctly', () => {
    const netWorthInfo: NetWorthInfo = {
      netWorth: 14500.12,
      investments: 11000.12,
      cash: 3500.0,
    };
    const { asFragment } = render(<NetWorth netWorthInfo={netWorthInfo} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
