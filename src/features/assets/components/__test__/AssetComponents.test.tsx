/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';

import { AssetComponents } from '../detailsComponents/AssetComponents';
import { fetchAssetEmptyResponse, fetchAssetsComponents } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <AssetComponents id={1} />
    </AppProvider>
  );
};

describe('AssetComponents', () => {
  it('should display components', async () => {
    mswServer.use(fetchAssetsComponents);
    await act(async () => {
      render(<Provider />);
    });
    // Table Head
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/serial/i)).toBeInTheDocument();
    expect(await screen.findByText(/category/i)).toBeInTheDocument();
    // Table Body
    expect(await screen.findByText(/PNY XLR8 RGB 16GB 3200Mhz/i)).toBeInTheDocument();
    expect(await screen.findByText(/ba81-874f-3fbe-99b9-30624/i)).toBeInTheDocument();
    expect(await screen.findByText(/RAM/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    mswServer.use(fetchAssetEmptyResponse);

    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
