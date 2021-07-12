import React from 'react';
import { render } from '@testing-library/react';
import { CenteredMessage } from './CenteredMessage';
import { ViewCenteredMessage } from './ViewCenteredMessage';

describe('CenteredMessage', () => {
  test('CenteredMessage renders correctly', () => {
    const { asFragment } = render(
      <CenteredMessage>Hello World!</CenteredMessage>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ViewCenteredMessage renders correctly', () => {
    const { asFragment } = render(
      <ViewCenteredMessage>Hello World!</ViewCenteredMessage>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
