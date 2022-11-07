/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddAsset from '../AddAsset';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as element from './getElemetns';
import { QueryClientProvider } from 'react-query';
import { getQueryClient } from 'lib/react-query';
import { type AppProviderProps } from 'providers/types';
import { routePath } from 'routes';
import { fetchAssetsCategory, fetchAssetsInfo, fetchAssetsModel } from './mockApiHandlers';
import { mswServer } from 'mocks/mswServer';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';

const Provider = ({ children }: AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={getQueryClient()}>
        <ConfirmProvider>
          <SnackbarProvider maxSnack={3}>
            <MemoryRouter initialEntries={['/EditAsset/1']}>
              <Routes>
                <Route element={children} path={routePath.editAsset} />
              </Routes>
            </MemoryRouter>
          </SnackbarProvider>
        </ConfirmProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

describe('Edit form', () => {
  it('should render Edit Asset heading and Edit Buttons', async () => {
    await act(async () => {
      render(
        <Provider>
          <AddAsset />
        </Provider>,
      );
    });

    expect(screen.getByText(/edit asset/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', {
        name: /edit/i,
      }).length,
    ).toBe(2);
  });

  it('inputs should have value', async () => {
    mswServer.use(fetchAssetsCategory);
    mswServer.use(fetchAssetsModel);
    mswServer.use(fetchAssetsInfo);
    await act(async () => {
      render(
        <Provider>
          <AddAsset />
        </Provider>,
      );
    });

    expect(element.getAssetTag()).toHaveValue();
    expect(element.getSerial()).toHaveValue();
    expect(element.getSelectModel()).toHaveValue();
    expect(element.getSelectStatus()).toHaveValue();
    expect(await element.getNotes()).toHaveValue();
    expect(await element.getAssetName()).toHaveValue();
    expect(await element.getWaranty()).toHaveValue();
    expect(await element.getOrderNumber()).toHaveValue();
    expect(await element.getDateOfPurchase()).toHaveValue();
    expect(await element.getPurchaseCost()).toHaveValue();
  });
});
