import React from 'react';
import { render } from '../../test/test-utils';
import { Home } from './Home';

describe('<Home />', () => {
  test('renders correctly', async () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('home-hero')).toBeTruthy();
    expect(getByTestId('home-content')).toBeTruthy();
    expect(getByTestId('home-footer')).toBeTruthy();
  });
});
