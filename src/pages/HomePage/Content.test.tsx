import React from 'react';
import { render } from '../../test/test-utils';
import { Content } from './Content';

describe('<Content />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Content />);
    expect(asFragment()).toMatchSnapshot();
  });
});
