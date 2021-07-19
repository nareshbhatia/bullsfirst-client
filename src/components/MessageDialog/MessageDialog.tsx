import React from 'react';
import Popup from 'reactjs-popup';
import { ActionBar } from '../ActionBar';
import { useMessageContext } from './MessageContext';
import './MessageDialog.css';
import { HorizontalContainer } from '../Containers';

export const MessageDialog = () => {
  const { messageState } = useMessageContext();
  const { showDialog, title, message, buttonSpecs } = messageState;

  return (
    <Popup
      open={showDialog}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      modal
      nested
    >
      <div className="message-dialog">
        {title && (
          <div className="mb-4">
            <h1 className="dialog-title">{title}</h1>
          </div>
        )}
        {message && <div className="mb-4">{message}</div>}
        {buttonSpecs && (
          <HorizontalContainer className="justify-end">
            <ActionBar buttonSpecs={buttonSpecs} />
          </HorizontalContainer>
        )}
      </div>
    </Popup>
  );
};
