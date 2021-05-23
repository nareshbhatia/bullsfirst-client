import React from 'react';
import { FaRedoAlt } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import './AccountHeader.css';

export const AccountHeader = () => {
  const { accountId } = useParams();

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

      <button className="btn-sm btn-outline-secondary mr-1">Transfer</button>
      <button className="btn-sm btn-secondary mr-1">
        Trade
      </button>
      <FaRedoAlt className="account-header__refresh" />
    </nav>
  );
};
