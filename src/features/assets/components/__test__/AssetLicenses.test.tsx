/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { AssetLicenses } from '../detailsComponents/AssetLicenses';
import { fetchAssetEmptyResponse, fetchAssetsLicenses } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <AssetLicenses id={1} />
    </AppProvider>
  );
};

describe('AssetLicenses', () => {
  it('should display licenses', async () => {
    mswServer.use(fetchAssetsLicenses);
    await act(async () => {
      render(<Provider />);
    });
    expect(await screen.findByText(/22.12.2032/i)).toBeInTheDocument();
    expect(await screen.findByText(/Photoshop/i)).toBeInTheDocument();
    expect(await screen.findByText(/ba81-874f-3fbe-99b9-30624/i)).toBeInTheDocument();
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/key/i)).toBeInTheDocument();
    expect(await screen.findByText(/Expiration date/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    mswServer.use(fetchAssetEmptyResponse);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
