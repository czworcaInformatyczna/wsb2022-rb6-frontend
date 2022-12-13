/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { AssetHistory } from '../detailsComponents/AssetHistory';
import { fetchAssetEmptyResponse, fetchAssetsHistory } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <AssetHistory id={1} />
    </AppProvider>
  );
};

describe('AssetHistory', () => {
  it('should display history', async () => {
    mswServer.use(fetchAssetsHistory);
    await act(async () => {
      render(<Provider />);
    });
    // Table Head
    expect(await screen.findByText(/date/i)).toBeInTheDocument();
    expect(await screen.findByText(/user/i)).toBeInTheDocument();
    expect(await screen.findByText(/action/i)).toBeInTheDocument();
    expect(await screen.findByText(/target/i)).toBeInTheDocument();
    expect(await screen.findByText(/description/i)).toBeInTheDocument();

    // Table Body
    expect(await screen.findByText('2022-12-02')).toBeInTheDocument();
    expect(await screen.findByText(/asdk@gmail.com/i)).toBeInTheDocument();
    expect(await screen.findByText(/Deploy/i)).toBeInTheDocument();
    expect(await screen.findByText(/test1/i)).toBeInTheDocument();
    expect(await screen.findByText(/status/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    mswServer.use(fetchAssetEmptyResponse);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
