/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddLicense from '../AddLicense';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as element from './getElemetns';
import { QueryClientProvider } from 'react-query';
import { getQueryClient } from 'lib/react-query';
import { type AppProviderProps } from 'providers/types';
import { routePath } from 'routes';
import {
  fetchLicenseCategory,
  fetchLicenseManufacturers,
  fetchLicenseEditInfo,
} from './mockApiHandlers';
import { mswServer } from 'mocks/mswServer';

const Provider = ({ children }: AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={getQueryClient()}>
        <MemoryRouter initialEntries={['/EditLicense/1']}>
          <Routes>
            <Route element={children} path={routePath.editLicense} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

describe('Edit license form', () => {
  it('should render Edit License heading and Edit Buttons', async () => {
    await act(async () => {
      render(
        <Provider>
          <AddLicense />
        </Provider>,
      );
    });

    expect(screen.getByText(/edit license/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', {
        name: /edit/i,
      }).length,
    ).toBe(2);
  });

  it('inputs should have value', async () => {
    mswServer.use(fetchLicenseCategory);
    mswServer.use(fetchLicenseManufacturers);
    mswServer.use(fetchLicenseEditInfo);
    await act(async () => {
      render(
        <Provider>
          <AddLicense />
        </Provider>,
      );
    });
    expect(element.getName()).toHaveValue();
    expect(element.getKey()).toHaveValue();
    expect(element.getSelectCategory()).toHaveValue();
    expect(element.getSelectManufacturer()).toHaveValue();
    expect(element.getQuantity()).toHaveValue();
    expect(await element.getExpirationDate()).toHaveValue();
    expect(await element.getLicensedTo()).toHaveValue();
    expect(await element.getDateOfPurchase()).toHaveValue();
    expect(await element.getOrderNumber()).toHaveValue();
    expect(await element.getPurchaseCost()).toHaveValue();
    expect(await element.getNotes()).toHaveValue();
  });
});
