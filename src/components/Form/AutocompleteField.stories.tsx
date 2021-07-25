import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { SecurityService } from '../../services';
import { AutocompleteField } from './AutocompleteField';
import { OptionTypeBase } from 'react-select/src/types';

// ---------- Load Autocomplete Options ----------
const loadOptions = async (inputValue: string): Promise<OptionTypeBase[]> => {
  const securities = await SecurityService.fetchSecurities(inputValue);
  return securities.map((security) => ({
    value: security.id,
    label: `${security.id} (${security.name})`,
  }));
};

// ---------- TestForm ----------
const schema = yup.object().shape({
  symbol: yup.string().required(),
});

interface Order {
  symbol: string;
}

interface TestFormProps {
  onSubmit: (order: Order) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
  const { control, formState, handleSubmit } = useForm<Order>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <AutocompleteField
          id="symbol"
          name="symbol"
          label="Symbol"
          error={errors.symbol?.message}
          control={control}
          loadOptions={loadOptions}
        />
      </div>

      <button className="btn-lg w-full" type="submit">
        Submit
      </button>
    </form>
  );
}

export default {
  title: 'Forms/AutocompleteField',
  component: AutocompleteField,
} as Meta;

const Template: Story = () => {
  const [order, setOrder] = useState<Order>();

  return (
    <div style={{ width: 320 }}>
      <TestForm onSubmit={setOrder} />
      <div className="mt-2">
        <h4 className="m-0">Form value</h4>
        <p>Symbol: {order?.symbol}</p>
      </div>
    </div>
  );
};

export const AutocompleteFieldStory = Template.bind({});
AutocompleteFieldStory.storyName = 'AutocompleteField';
AutocompleteFieldStory.args = {};
