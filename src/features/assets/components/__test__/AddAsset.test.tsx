import { render, screen, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AddAsset from '../AddAsset';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClientProvider } from 'react-query';
import { getQueryClient } from 'lib/react-query';
import { type AppProviderProps } from 'providers/types';

const getAssetTag = () => {
  return screen.getByRole('textbox', {
    name: /asset tag/i,
  });
};

const getSerial = () => {
  return screen.getByRole('textbox', {
    name: /serial/i,
  });
};

const getSelectModel = () => {
  return screen.getByRole('combobox', {
    name: /model/i,
  });
};

const getSelectStatus = () => {
  return screen.getByRole('combobox', {
    name: /status/i,
  });
};

const getAdditionalInformation = () => {
  return screen.getByText(/additional informations/i);
};

const getOrderInformation = () => {
  return screen.getByText(/order information/i);
};

const getNotes = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByLabelText(/notes/i);
};

const getUploadPhoto = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('button', {
    name: /upload photo/i,
  });
};

const getAssetName = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('textbox', {
    name: /asset name/i,
  });
};

const getWaranty = async () => {
  await user.click(getAdditionalInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('spinbutton', {
    name: /waranty/i,
  });
};

const getOrderNumber = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('textbox', {
    name: /order number/i,
  });
};

const getDateOfPurchase = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('textbox', {
    name: /date of purchase/i,
  });
};

const getPurchaseCost = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('spinbutton', {
    name: /purchase cost/i,
  });
};

const getReceiptImage = async () => {
  await user.click(getOrderInformation()); // Open acccordion so the element can be visible and found by getByRole
  return screen.getByRole('button', {
    name: /upload receipt image/i,
  });
};

const getAddButtons = () => {
  return screen.getAllByRole('button', { name: /add/i });
};

const Provider = ({ children }: AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

describe('AddAsset form', () => {
  it('should render all inputs', async () => {
    render(
      <Provider>
        <AddAsset />
      </Provider>,
    );
    expect(getAssetTag()).toBeInTheDocument();
    expect(getSerial()).toBeInTheDocument();
    expect(getSelectModel()).toBeInTheDocument();
    expect(getSelectStatus()).toBeInTheDocument();
    expect(await getNotes()).toBeInTheDocument();
    expect(await getUploadPhoto()).toBeInTheDocument();
    expect(await getAssetName()).toBeInTheDocument();
    expect(await getWaranty()).toBeInTheDocument();
    expect(await getOrderNumber()).toBeInTheDocument();
    expect(await getDateOfPurchase()).toBeInTheDocument();
    expect(await getPurchaseCost()).toBeInTheDocument();
    expect(await getReceiptImage()).toBeInTheDocument();
  });

  it('should display error messages', async () => {
    render(
      <Provider>
        <AddAsset />
      </Provider>,
    );
    const button = getAddButtons()[0];
    fireEvent.click(button);
    const errors = await screen.findAllByText(/required value/i);
    expect(errors.length).toBe(4);
  });
});
