import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { OptionTypeBase } from 'react-select/src/types';
import { ErrorMessage } from './ErrorMessage';

export interface AutocompleteFieldProps<OptionType extends OptionTypeBase> {
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
  getOptionValue: (option: OptionType) => string;

  /* function to get the label for an option */
  getOptionLabel: (option: OptionType) => string;

  /* function to load options based on input value */
  loadOptions: (inputValue: string) => Promise<Array<OptionType>>;
}

export function AutocompleteField<OptionType extends OptionTypeBase>({
  id,
  name,
  label,
  error,
  control,
  getOptionValue,
  getOptionLabel,
  loadOptions,
}: AutocompleteFieldProps<OptionType>) {
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
