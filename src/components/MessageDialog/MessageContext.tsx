import React, { useContext, useState } from 'react';
import { ButtonSpec } from '../ActionBar';

// ---------- MessageContext ----------
type MessageState = {
  showDialog: boolean;
  title?: string;
  message?: string;
  buttonSpecs?: Array<ButtonSpec>;
};
type MessageStateSetter = (messageState: MessageState) => void;

/** MessageContext contains MessageState and MessageStateSetter */
const MessageContext = React.createContext<
  | { messageState: MessageState; setMessageState: MessageStateSetter }
  | undefined
>(undefined);

// ---------- MessageContextProvider ----------
const MessageContextProvider: React.FC = ({ children }) => {
  const [messageState, setMessageState] = useState<MessageState>({
    showDialog: false,
    buttonSpecs: [],
  });

  const value = { messageState, setMessageState };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

// ---------- useMessageContext ----------
function useMessageContext() {
  const messageContext = useContext(MessageContext);
  /* istanbul ignore next */
  if (messageContext === undefined) {
    throw new Error(
      'useMessageContext must be used within a MessageContextProvider'
    );
  }
  return messageContext;
}

export { MessageContextProvider, useMessageContext };
