import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddAsset from '../AddAsset';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as element from './getElemetns';
import { QueryClientProvider } from 'react-query';
import { getQueryClient } from 'lib/react-query';
import { type AppProviderProps } from 'providers/types';

const Provider = ({ children }: AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={getQueryClient()}>
        <MemoryRouter initialEntries={['/EditAsset/1']}>
          <Routes>
            <Route element={children} path="EditAsset/:id" />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

describe('Edit form', () => {
  it('should render Edit Asset heading', async () => {
    render(
      <Provider>
        <AddAsset />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/edit asset/i)).toBeInTheDocument();
    });
    const el = element.getAssetTag();
    expect(el).toHaveValue('assetTag');
  });

  it('assetTag input should have value', async () => {
    render(
      <Provider>
        <AddAsset />
      </Provider>,
    );

    const el = element.getAssetTag();
    expect(el).toHaveValue('assetTag');
  });
});
