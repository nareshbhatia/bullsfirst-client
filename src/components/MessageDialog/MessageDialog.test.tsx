import React from 'react';
import { render, screen, userEvent } from '../../test/test-utils';
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
    render(<TestContainer />);

    // Open the MessageDialog by clicking on the Show Message button
    userEvent.click(screen.getByText('Show Message'));
    screen.getByText('SUCCESS');
    expect(screen.getByText('Your transfer was successful.')).toBeTruthy();

    // Close the MessageDialog
    userEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('SUCCESS')).toBeNull();
  });
});
