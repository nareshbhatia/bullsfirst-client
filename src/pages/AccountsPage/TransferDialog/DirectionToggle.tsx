import React from 'react';
import { MdSwapHoriz } from 'react-icons/md';
import { Direction } from '../../../graphql';
import './DirectionToggle.css';

export interface DirectionToggleProps {
  direction: Direction;
  onClick: () => void;
}

export const DirectionToggle = ({
  direction,
  onClick,
}: DirectionToggleProps) => {
  const textColor =
    direction === Direction.In ? 'color-xfer-in' : 'color-xfer-out';

  return (
    <div
      data-testid="direction-toggle-button"
      className={`flex flex-row items-center cursor-pointer ${textColor}`}
      onClick={onClick}
    >
      <MdSwapHoriz />
      <span className="ml-1 direction-toggle__label">
        {direction === Direction.In ? 'IN' : 'OUT'}
      </span>
    </div>
  );
};
