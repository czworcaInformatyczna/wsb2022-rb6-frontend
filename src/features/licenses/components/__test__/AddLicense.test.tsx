import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddLicense from '../AddLicense';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as element from './getElemetns';
import { QueryClientProvider } from 'react-query';
import { getQueryClient } from 'lib/react-query';
import { type AppProviderProps } from 'providers/types';

const Provider = ({ children }: AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

describe('AddLicense form', () => {
  it('should render all inputs', async () => {
    render(
      <Provider>
        <AddLicense />
      </Provider>,
    );
    expect(element.getName()).toBeInTheDocument();
    expect(element.getKey()).toBeInTheDocument();
    expect(element.getSelectCategory()).toBeInTheDocument();
    expect(element.getSelectManufacturer()).toBeInTheDocument();
    expect(element.getQuantity()).toBeInTheDocument();
    expect(await element.getExpirationDate()).toBeInTheDocument();
    expect(await element.getLicensedTo()).toBeInTheDocument();
    expect(await element.getDateOfPurchase()).toBeInTheDocument();
    expect(await element.getOrderNumber()).toBeInTheDocument();
    expect(await element.getPurchaseCost()).toBeInTheDocument();
    expect(await element.getNotes()).toBeInTheDocument();
  });

  it('should display error messages', async () => {
    render(
      <Provider>
        <AddLicense />
      </Provider>,
    );
    const button = element.getAddButtons()[0];
    await user.click(button);
    const errors = await screen.findAllByText(/required value/i);
    expect(errors.length).toBeGreaterThan(0);
  });
});
