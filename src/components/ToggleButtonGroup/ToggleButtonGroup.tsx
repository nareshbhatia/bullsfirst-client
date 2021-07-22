import React from 'react';
import { HorizontalContainer } from '../Containers';
import { ToggleButton } from './ToggleButton';

export interface ToggleButtonGroupProps {
  value: string | undefined;
  options: Array<{ value: string; label: string }>;
  onChange: (newValue: string) => void;
}

export const ToggleButtonGroup = ({
  value,
  options,
  onChange,
}: ToggleButtonGroupProps) => {
  return (
    <HorizontalContainer className="h-full">
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          label={option.label}
          selected={option.value === value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </HorizontalContainer>
  );
};
