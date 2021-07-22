import React from 'react';
import './ToggleButton.css';

export interface ToggleButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const ToggleButton = ({
  label,
  selected,
  onClick,
}: ToggleButtonProps) => {
  return (
    <div className={`toggleButton ${selected && 'selected'}`} onClick={onClick}>
      {label}
    </div>
  );
};
