/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddAsset from '../AddAsset';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as element from './getElemetns';
import { QueryClientProvider } from 'react-query';
import { getQueryClient } from 'lib/react-query';
import { type AppProviderProps } from 'providers/types';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
jest.setTimeout(10000);

const Provider = ({ children }: AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ConfirmProvider>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </ConfirmProvider>
    </LocalizationProvider>
  );
};

describe('AddAsset form', () => {
  it('should render all inputs', async () => {
    act(() => {
      render(
        <Provider>
          <AddAsset />
        </Provider>,
      );
    });
    expect(element.getAssetTag()).toBeInTheDocument();
    expect(element.getSerial()).toBeInTheDocument();
    expect(element.getSelectModel()).toBeInTheDocument();
    expect(element.getSelectStatus()).toBeInTheDocument();
    expect(await element.getNotes()).toBeInTheDocument();
    expect(await element.getUploadPhoto()).toBeInTheDocument();
    expect(await element.getAssetName()).toBeInTheDocument();
    expect(await element.getWaranty()).toBeInTheDocument();
    expect(await element.getOrderNumber()).toBeInTheDocument();
    expect(await element.getDateOfPurchase()).toBeInTheDocument();
    expect(await element.getPurchaseCost()).toBeInTheDocument();
  });

  it('should display error messages', async () => {
    act(() => {
      render(
        <Provider>
          <AddAsset />
        </Provider>,
      );
    });
    const button = element.getAddButtons()[0];
    await user.click(button);
    const errors = await screen.findAllByText(/required value/i);
    expect(errors.length).toBeGreaterThan(0);
  });
});
