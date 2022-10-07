import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddAsset from '../AddAsset';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as element from './getElemetns';

describe('AddAsset form', () => {
  it('should render all inputs', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <AddAsset />
        </BrowserRouter>
      </LocalizationProvider>,
    );
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
    expect(await element.getReceiptImage()).toBeInTheDocument();
  });

  it('should display error messages', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <AddAsset />
        </BrowserRouter>
      </LocalizationProvider>,
    );
    const button = element.getAddButtons()[0];
    fireEvent.click(button);
    const errors = await screen.findAllByText(/required value/i);
    expect(errors.length).toBeGreaterThan(0);
  });
});
