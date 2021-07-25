import React, { Fragment, useState } from 'react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { OptionTypeBase } from 'react-select/src/types';
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

  /* function to load options based on input value */
  loadOptions: (inputValue: string) => Promise<OptionTypeBase[]>;
}

export const AutocompleteField = ({
  id,
  name,
  label,
  error,
  control,
  loadOptions,
}: AutocompleteFieldProps) => {
  const [selectedOption, setSelectedOption] = useState<
    OptionTypeBase | undefined
  >();

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
          const { value, onChange, ...rest } = field;
          return (
            <AsyncSelect
              {...rest}
              className="autocomplete-field"
              styles={customStyles}
              value={selectedOption}
              onChange={(option: OptionTypeBase) => {
                if (option) {
                  setSelectedOption(option);
                  onChange(option.value);
                } else {
                  setSelectedOption(undefined);
                }
              }}
              loadOptions={loadOptions}
              isClearable
            />
          );
        }}
      />
      <ErrorMessage error={error} />
    </Fragment>
  );
};
