/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { AssetInfo } from '../detailsComponents/AssetInfo';
import { fetchAssetsDetails } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <AssetInfo id={1} />
    </AppProvider>
  );
};

describe('AssetInfo', () => {
  it('should display all data', async () => {
    mswServer.use(fetchAssetsDetails);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/id/i)).toBeInTheDocument();
    expect(await screen.findByText(/16/i)).toBeInTheDocument();
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/asset1/i)).toBeInTheDocument();
    expect(await screen.findByText(/serial/i)).toBeInTheDocument();
    expect(await screen.findByText(/1234/i)).toBeInTheDocument();
    expect(await screen.findByText(/model/i)).toBeInTheDocument();
    expect(await screen.findByText(/YYEz64GgdQ3M/i)).toBeInTheDocument();
    expect(await screen.findByText(/Manufacturer/i)).toBeInTheDocument();
    expect(await screen.findByText(/Dell/i)).toBeInTheDocument();
    expect(await screen.findByText(/Category/i)).toBeInTheDocument();
    expect(await screen.findByText(/PC/i)).toBeInTheDocument();
    expect(await screen.findByText(/Status/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ready to deploy/i)).toBeInTheDocument();
    expect(await screen.findByText(/AssetTag/i)).toBeInTheDocument();
    expect(await screen.findByText(/890/i)).toBeInTheDocument();
    expect(await screen.findByText(/Notes/i)).toBeInTheDocument();
    expect(await screen.findByText(/some info/i)).toBeInTheDocument();
    expect(await screen.findByText(/Waranty/i)).toBeInTheDocument();
    expect(await screen.findByText(/61/i)).toBeInTheDocument();
  });
});
