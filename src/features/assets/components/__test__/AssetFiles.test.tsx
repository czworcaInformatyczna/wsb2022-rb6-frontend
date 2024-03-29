/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { AssetFiles } from '../detailsComponents/AssetFiles';
import { fetchAssetEmptyResponse } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <AssetFiles id={1} isManage />
    </AppProvider>
  );
};

describe('AssetFiles', () => {
  it('should display files', async () => {
    await act(async () => {
      render(<Provider />);
    });
    // Table Head
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/extension/i)).toBeInTheDocument();
    expect(await screen.findByText(/size/i)).toBeInTheDocument();
    expect(await screen.findByText(/upload date/i)).toBeInTheDocument();

    // Table Body
    expect(await screen.findByText(/file1/i)).toBeInTheDocument();
    expect(await screen.findByText(/.txt/i)).toBeInTheDocument();
    expect(await screen.findByText(/5kb/i)).toBeInTheDocument();
    expect(await screen.findByText(/2022-11-27/i)).toBeInTheDocument();
    expect(await screen.findByText(/email@email.com/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    mswServer.use(fetchAssetEmptyResponse);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
