import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useOrderContext } from '../OrderDialog';
import { useTransferContext } from '../TransferDialog';
import { RefreshButton } from './RefreshButton';
import './AccountHeader.css';

export const AccountHeader = () => {
  const { accountId } = useParams();
  const { setOrderState } = useOrderContext();
  const { setTransferState } = useTransferContext();

  const handleTradeClicked = () => {
    setOrderState({ showDialog: true });
  };

  const handleTransferClicked = () => {
    setTransferState({ showDialog: true });
  };

  return (
    <nav className="account-header">
      <ul className="flex-1">
        <li>
          <NavLink
            className="account-header__link"
            to={`/accounts/${accountId}/overview`}
            end
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            className="account-header__link"
            to={`/accounts/${accountId}/holdings`}
            end
          >
            Holdings
          </NavLink>
        </li>
        <li>
          <NavLink
            className="account-header__link"
            to={`/accounts/${accountId}/orders`}
            end
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            className="account-header__link"
            to={`/accounts/${accountId}/activity`}
            end
          >
            Activity
          </NavLink>
        </li>
      </ul>

      <button
        className="btn-sm btn-outline-secondary mr-1"
        onClick={handleTransferClicked}
      >
        Transfer
      </button>

      <button
        className="btn-sm btn-secondary mr-1"
        onClick={handleTradeClicked}
      >
        Trade
      </button>
      <RefreshButton />
    </nav>
  );
};
