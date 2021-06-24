import React from 'react';
import { render } from '../../test/test-utils';
import { Hero } from './Hero';

describe('<Hero />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Hero />);
    expect(asFragment()).toMatchSnapshot();
  });
});
