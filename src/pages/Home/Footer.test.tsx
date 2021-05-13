import React from 'react';
import { render } from '../../test/test-utils';
import { Footer } from './Footer';

describe('<Footer />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
