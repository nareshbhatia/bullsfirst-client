import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/test-utils';
import { HorizontalContainer } from '../Containers';
import { useMessageContext } from './MessageContext';

const TestContainer = () => {
  const { setMessageState } = useMessageContext();

  const closeButton = {
    label: 'Close',
    className: 'btn-sm btn-outline-secondary',
    onClick: () => {
      setMessageState({ showDialog: false });
    },
  };

  const handleShowMessageClicked = () => {
    setMessageState({
      showDialog: true,
      title: 'SUCCESS',
      message: 'Your transfer was successful.',
      buttonSpecs: [closeButton],
    });
  };

  return (
    <HorizontalContainer className="paper border-paper p-2">
      <button
        className="btn-sm btn-outline-secondary"
        onClick={handleShowMessageClicked}
      >
        Show Message
      </button>
    </HorizontalContainer>
  );
};

describe('<MessageDialog />', () => {
  test('performs actions on button click', () => {
    const { getByText, queryByText } = render(<TestContainer />);

    // Open the MessageDialog by clicking on the Show Message button
    userEvent.click(getByText('Show Message'));
    getByText('SUCCESS');
    expect(getByText('Your transfer was successful.')).toBeTruthy();

    // Close the MessageDialog
    userEvent.click(getByText('Close'));
    expect(queryByText('SUCCESS')).toBeNull();
  });
});
