import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { ErrorMessage } from './ErrorMessage';

export interface NumberFieldProps {
  /** used to make label and errorText accessible for screen readers */
  id?: string;

  /** used to create data-testid property on element for testing */
  testId?: string;

  /** passed to the controller */
  name: string;

  /** the label content */
  label?: React.ReactNode;

  /** error text */
  error?: string;

  /* limits to given decimal scale */
  decimalScale?: number;

  /* RHF object containing methods to register components */
  control: any;
}

export const NumberField = ({
  id,
  testId,
  name,
  label,
  error,
  decimalScale,
  control,
}: NumberFieldProps) => {
  return (
    <Fragment>
      {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NumberFormat
            id={id}
            name={name}
            data-testid={testId}
            className="text-field__input"
            value={field.value}
            thousandSeparator={true}
            decimalScale={decimalScale}
            onValueChange={(target) => {
              field.onChange(target.floatValue);
            }}
            isNumericString
          />
        )}
      />
      <ErrorMessage error={error} />
    </Fragment>
  );
};
