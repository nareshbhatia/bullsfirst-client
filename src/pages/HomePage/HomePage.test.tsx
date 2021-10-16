import React from 'react';
import { render, screen } from '../../test/test-utils';
import { HomePage } from './HomePage';

describe('<Home />', () => {
  test('renders correctly', async () => {
    render(<HomePage />);
    expect(screen.getByTestId('home-hero')).toBeTruthy();
    expect(screen.getByTestId('home-content')).toBeTruthy();
    expect(screen.getByTestId('home-footer')).toBeTruthy();
  });
});
