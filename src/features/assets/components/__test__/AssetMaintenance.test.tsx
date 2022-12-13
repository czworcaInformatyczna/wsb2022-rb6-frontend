/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { AssetMaintenance } from '../detailsComponents/AssetMaintenance';
import { fetchAssetEmptyResponse, fetchAssetsMaintenances } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <AssetMaintenance id={1} />
    </AppProvider>
  );
};

describe('AssetMaintenance', () => {
  mswServer.use(fetchAssetsMaintenances);
  it('should display maintenances', async () => {
    await act(async () => {
      render(<Provider />);
    });

    // Table Head
    expect(await screen.findByText(/title/i)).toBeInTheDocument();
    expect(await screen.findByText(/maintenance type/i)).toBeInTheDocument();
    expect(await screen.findByText(/start date/i)).toBeInTheDocument();
    expect(await screen.findByText(/end date/i)).toBeInTheDocument();
    expect(await screen.findByText(/user/i)).toBeInTheDocument();
    expect(await screen.findByText(/notes/i)).toBeInTheDocument();
    // Table Body
    expect(await screen.findByText(/add ram/i)).toBeInTheDocument();
    expect(await screen.findByText(/clean/i)).toBeInTheDocument();
    expect(await screen.findByText('22/10/2022')).toBeInTheDocument();
    expect(await screen.findByText('30/10/2022')).toBeInTheDocument();
    expect(await screen.findByText(/usr1/i)).toBeInTheDocument();
    expect(await screen.findByText(/some info/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    mswServer.use(fetchAssetEmptyResponse);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
