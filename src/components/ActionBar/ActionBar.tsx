import React, { Fragment } from 'react';

export interface ButtonSpec {
  label: string;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick: () => void;
}

export interface ActionBarProps {
  buttonSpecs: Array<ButtonSpec>;
}

export const ActionBar = ({ buttonSpecs }: ActionBarProps) => {
  return (
    <Fragment>
      {buttonSpecs.map((buttonSpec) => {
        const { label, className, type = 'button', onClick } = buttonSpec;
        return (
          <button
            key={label}
            className={className}
            type={type}
            onClick={onClick}
          >
            {label}
          </button>
        );
      })}
    </Fragment>
  );
};
