import React from 'react';
import { FaRedoAlt } from 'react-icons/fa';
import { useRefreshContext } from '../../../contexts';

export const RefreshButton = () => {
  const { refreshCount, setRefreshCount } = useRefreshContext();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  return (
    <FaRedoAlt className="account-header__refresh" onClick={handleRefresh} />
  );
};
