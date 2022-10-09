import { act, render, screen } from '@testing-library/react';
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
  // eslint-disable-next-line jest/expect-expect
  it('should render Edit Asset heading', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Provider>
          <AddAsset />
        </Provider>,
      );
    });

    expect(screen.getByText(/edit asset/i)).toBeInTheDocument();
  });

  it('assetTag input should have value', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Provider>
          <AddAsset />
        </Provider>,
      );
    });
    const el = element.getAssetTag();
    expect(el).toHaveValue('assetTag');
  });
});
