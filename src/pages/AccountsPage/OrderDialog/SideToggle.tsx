import React from 'react';
import { MdSwapHoriz } from 'react-icons/md';
import { Side } from '../../../graphql';
import './SideToggle.css';

export interface SideToggleProps {
  side: Side;
  onClick: () => void;
}

export const SideToggle = ({ side, onClick }: SideToggleProps) => {
  const textColor = side === Side.Buy ? 'color-buy' : 'color-sell';

  return (
    <div
      data-testid="side-toggle-button"
      className={`flex flex-row items-center cursor-pointer ${textColor}`}
      onClick={onClick}
    >
      <MdSwapHoriz />
      <span className="ml-1 side-toggle__label">
        {side === Side.Buy ? 'BUY' : 'SELL'}
      </span>
    </div>
  );
};
