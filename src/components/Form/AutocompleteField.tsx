import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { ErrorMessage } from './ErrorMessage';

export interface AutocompleteFieldProps {
  /** used to make label and errorText accessible for screen readers */
  id?: string;

  /** passed to the controller */
  name: string;

  /** the label content */
  label?: React.ReactNode;

  /** error text */
  error?: string;

  /* RHF object containing methods to register components */
  control: any;

  /* function to get the value of an option */
  getOptionValue: (option: any) => string;

  /* function to get the label for an option */
  getOptionLabel: (option: any) => string;

  /* function to load options based on input value */
  loadOptions: (inputValue: string) => Promise<Array<any>>;
}

export function AutocompleteField({
  id,
  name,
  label,
  error,
  control,
  getOptionValue,
  getOptionLabel,
  loadOptions,
}: AutocompleteFieldProps) {
  const customStyles = {
    valueContainer: () => ({
      padding: 8,
    }),
  };

  return (
    <Fragment>
      {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <AsyncSelect
              inputId={id}
              {...field}
              styles={customStyles}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              loadOptions={loadOptions}
              isClearable
            />
          );
        }}
      />
      <ErrorMessage error={error} />
    </Fragment>
  );
}
