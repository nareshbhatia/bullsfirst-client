import React from 'react';
import { render } from '../../test/test-utils';
import { HomePage } from './HomePage';

describe('<Home />', () => {
  test('renders correctly', async () => {
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId('home-hero')).toBeTruthy();
    expect(getByTestId('home-content')).toBeTruthy();
    expect(getByTestId('home-footer')).toBeTruthy();
  });
});
