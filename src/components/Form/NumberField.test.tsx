import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NumberField } from './NumberField';

// ---------- TestForm ----------
const schema = yup.object().shape({
  quantity: yup.number().typeError('quantity must be a number').required(),
  price: yup.number().typeError('price must be a number').required(),
});

interface Holding {
  quantity: number;
  price: number;
}

interface TestFormProps {
  onSubmit: (holding: Holding) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
  const { control, formState, handleSubmit } = useForm<Holding>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NumberField
        id="quantity"
        name="quantity"
        decimalScale={0}
        control={control}
        label="Quantity"
        error={errors.quantity?.message}
      />

      <NumberField
        id="price"
        testId="price"
        name="price"
        decimalScale={2}
        control={control}
        label="Price"
        error={errors.price?.message}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

// ---------- Tests ----------
const handleSubmit = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<NumberField />', () => {
  test('displays a validation error if validation fails', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Submit form with price not filled
    userEvent.type(screen.getByLabelText('Quantity'), '1000');
    userEvent.click(screen.getByText('Submit'));

    // Expect to see a validation error
    expect(await screen.findByText('price is a required field')).toBeTruthy();
  });

  test('submits form information if all validations pass', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Enter valid information and submit form
    userEvent.type(screen.getByLabelText('Quantity'), '1000');
    userEvent.type(screen.getByTestId('price'), '123.45');
    userEvent.click(screen.getByText('Submit'));

    // Expect handleSubmit to be called with the entered information
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        quantity: 1000,
        price: 123.45,
      },
      // ignore the event that is sent to handleSubmit
      expect.anything()
    );
  });
});
