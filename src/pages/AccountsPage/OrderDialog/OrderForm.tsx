import React from 'react';
import { useApolloClient } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  AutocompleteField,
  HorizontalContainer,
  NumberField,
  ToggleButtonGroup,
} from '../../../components';
import { GetSecuritiesDocument, OrderType, Side } from '../../../graphql';
import { useAccountContext } from '../AccountContext';
import { SideToggle } from './SideToggle';
import { OrderDefaults, useOrderContext } from './OrderContext';
import './OrderForm.css';

// ---------- Form ----------
const schema = yup.object().shape({
  accountId: yup.string().required(),
  side: yup.string().required(),
  security: yup
    .object()
    .shape({
      id: yup.string().required('symbol is required'),
      name: yup.string().required('symbol is required'),
    })
    .typeError('symbol is required')
    .required(),
  quantity: yup.number().required().min(1),
  type: yup.string().required(),
  limitPrice: yup.number().when('type', {
    is: OrderType.Market,
    then: yup.number().nullable(),
    otherwise: yup.number().typeError('must be a number').required(),
  }),
});

type Security = { id: string; name: string };

export type Order = {
  accountId: string;
  side: Side;
  security: Security;
  quantity: number;
  type: OrderType;
  limitPrice?: number;
};

export interface OrderFormProps {
  orderDefaults: OrderDefaults;
  onSubmit: (order: Order) => void;
}

export const OrderForm = ({ orderDefaults, onSubmit }: OrderFormProps) => {
  const apolloClient = useApolloClient();

  const { accountState } = useAccountContext();
  const { account } = accountState;

  const { setOrderState } = useOrderContext();
  const { control, formState, handleSubmit, setValue, watch } = useForm<Order>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: orderDefaults,
  });
  const { errors } = formState;
  const side = watch('side');
  const orderType = watch('type');
  const bgColor = side === Side.Buy ? 'bg-buy' : 'bg-sell';
  const titleColor = side === Side.Buy ? 'color-buy' : 'color-sell';

  const handleDiscard = () => {
    setOrderState({ showDialog: false });
  };

  const handleSideToggle = () => {
    setValue('side', side === Side.Buy ? Side.Sell : Side.Buy);
  };

  const handleOrderTypeChanged = (newType: string) => {
    setValue(
      'type',
      newType === OrderType.Market ? OrderType.Market : OrderType.Limit
    );
  };

  const loadOptions = async (inputValue: string): Promise<Array<Security>> => {
    const result = await apolloClient.query({
      query: GetSecuritiesDocument,
      variables: {
        query: inputValue,
      },
      fetchPolicy: 'no-cache',
    });
    return result.data.securities;
  };

  return (
    <form className={`order-form ${bgColor}`} onSubmit={handleSubmit(onSubmit)}>
      <HorizontalContainer>
        <h2 className={`dialog-title flex-1 ${titleColor}`}>
          {side === Side.Buy ? 'BUY' : 'SELL'}
        </h2>
        <SideToggle
          side={side === Side.Buy ? Side.Sell : Side.Buy}
          onClick={handleSideToggle}
        />
      </HorizontalContainer>
      <p data-testid="order-account" className={`mb-4 ${titleColor}`}>
        {account?.name}
      </p>

      <div className="mb-3">
        <AutocompleteField<Security>
          id="security"
          name="security"
          label="Symbol"
          // @ts-ignore
          error={errors.security?.message || errors.security?.id?.message}
          control={control}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => `${option.id} (${option.name})`}
          loadOptions={loadOptions}
        />
      </div>

      <div className="mb-3">
        <NumberField
          id="quantity"
          name="quantity"
          decimalScale={0}
          control={control}
          label="Quantity"
          error={errors.quantity?.message}
        />
      </div>

      <div className="h-6">
        <ToggleButtonGroup
          value={orderType}
          onChange={handleOrderTypeChanged}
          options={[
            { value: OrderType.Market, label: 'Market' },
            { value: OrderType.Limit, label: 'Limit' },
          ]}
        />
      </div>

      {orderType === OrderType.Limit && (
        <div className="mt-3">
          <NumberField
            id="limitPrice"
            name="limitPrice"
            decimalScale={2}
            control={control}
            label="Limit Price"
            error={errors.limitPrice?.message}
          />
        </div>
      )}

      <HorizontalContainer className="justify-end mt-6">
        <button
          className="btn-sm btn-outline-secondary"
          type="button"
          onClick={handleDiscard}
        >
          Discard
        </button>

        <button className="btn-sm btn-secondary ml-1" type="submit">
          Submit
        </button>
      </HorizontalContainer>
    </form>
  );
};
