import React from 'react';
import { useApolloClient } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { OptionTypeBase } from 'react-select/src/types';
import * as yup from 'yup';
import {
  AutocompleteField,
  HorizontalContainer,
  NumberField,
  ToggleButtonGroup,
} from '../../../components';
import {
  GerSecuritiesDocument,
  OrderInput,
  OrderType,
  Side,
} from '../../../graphql';
import { SecurityService } from '../../../services';
import { useAccountContext } from '../AccountContext';
import { SideToggle } from './SideToggle';
import { OrderDefaults, useOrderContext } from './OrderContext';
import './OrderForm.css';

// ---------- Form ----------
const schema = yup.object().shape({
  accountId: yup.string().required(),
  side: yup.string().required(),
  symbol: yup.string().required(),
  quantity: yup.number().required().min(1),
  type: yup.string().required(),
  limitPrice: yup.number().when('type', {
    is: OrderType.Market,
    then: yup.number().nullable(),
    otherwise: yup.number().typeError('must be a number').required(),
  }),
});

export interface OrderFormProps {
  orderDefaults: OrderDefaults;
  onSubmit: (orderInput: OrderInput) => void;
}

export const OrderForm = ({ orderDefaults, onSubmit }: OrderFormProps) => {
  const apolloClient = useApolloClient();

  const { accountState } = useAccountContext();
  const { account } = accountState;

  const { setOrderState } = useOrderContext();
  const { control, formState, handleSubmit, setValue, watch } =
    useForm<OrderInput>({
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

  const loadOptions = async (inputValue: string): Promise<OptionTypeBase[]> => {
    const result = await apolloClient.query({
      query: GerSecuritiesDocument,
      variables: {
        query: inputValue,
      },
      fetchPolicy: 'network-only',
    });
    return result.securities.map((security) => ({
      value: security.id,
      label: `${security.id} (${security.name})`,
    }));
  };

  return (
    <form className={`order-form ${bgColor}`} onSubmit={handleSubmit(onSubmit)}>
      <HorizontalContainer>
        <h1 className={`dialog-title flex-1 ${titleColor}`}>
          {side === Side.Buy ? 'BUY' : 'SELL'}
        </h1>
        <SideToggle
          side={side === Side.Buy ? Side.Sell : Side.Buy}
          onClick={handleSideToggle}
        />
      </HorizontalContainer>
      <p className={`mb-4 ${titleColor}`}>{account?.name}</p>

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
