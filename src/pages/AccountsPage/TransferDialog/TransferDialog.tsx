import React from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useMessageContext } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import {
  Direction,
  TransferCashDocument,
  TransferCashInput,
} from '../../../graphql';
import { useAccountContext } from '../AccountContext';
import { useTransferContext } from './TransferContext';
import { TransferForm } from './TransferForm';

export const TransferDialog = () => {
  const { accountState } = useAccountContext();
  const { account } = accountState;
  const { transferState, setTransferState } = useTransferContext();
  const { showDialog } = transferState;
  const { setMessageState } = useMessageContext();
  const [transferCash] = useMutation(TransferCashDocument);
  const { refreshCount, setRefreshCount } = useRefreshContext();
  const navigate = useNavigate();

  const closeButton = {
    label: 'Close',
    className: 'btn-sm btn-outline-secondary',
    onClick: () => {
      setMessageState({ showDialog: false });
    },
  };

  const viewTransactionsButton = {
    label: 'View Transactions',
    className: 'btn-sm btn-primary ml-1',
    onClick: () => {
      setMessageState({ showDialog: false });
      navigate(`/accounts/${account?.id}/activity`);
    },
  };

  if (account === undefined) {
    return null;
  }

  const defaultValues: Omit<TransferCashInput, 'amount'> = {
    accountId: account.id,
    direction: Direction.In,
  };

  const handleSubmit = async (transferCashInput: TransferCashInput) => {
    try {
      await transferCash({ variables: { transferCashInput } });
      setTransferState({ showDialog: false });
      setMessageState({
        showDialog: true,
        title: 'SUCCESS',
        message: 'Your transfer was successful.',
        buttonSpecs: [closeButton, viewTransactionsButton],
      });

      // Refresh the page to get latest data
      setRefreshCount(refreshCount + 1);
    } catch (e) {
      setTransferState({ showDialog: false });
      setMessageState({
        showDialog: true,
        title: 'ERROR',
        message: e instanceof Error ? e.message : "Unknown error",
        buttonSpecs: [closeButton],
      });
    }
  };

  return (
    <Popup
      open={showDialog}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      modal
      nested
    >
      <TransferForm transferDefaults={defaultValues} onSubmit={handleSubmit} />
    </Popup>
  );
};
