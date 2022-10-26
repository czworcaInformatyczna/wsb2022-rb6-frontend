/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { LicenseDeployment } from '../DetailsComponents/LicenseDeployment';
import { fetchAssetEmptyResponse, fetchLicenseDeployment } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <LicenseDeployment id={1} />
    </AppProvider>
  );
};

describe('LicenseDeployment', () => {
  it('should display table with license deployments', async () => {
    mswServer.use(fetchLicenseDeployment);
    await act(async () => {
      render(<Provider />);
    });

    // Table Head
    expect(await screen.findByText(/Id/i)).toBeInTheDocument();
    expect(await screen.findByText(/deployed to/i)).toBeInTheDocument();
    expect(await screen.findByText(/notes/i)).toBeInTheDocument();
    expect(await screen.findByText(/action/i)).toBeInTheDocument();

    // Table Body

    expect(await screen.findByText(/1/i)).toBeInTheDocument();
    expect(await screen.findByText(/2/i)).toBeInTheDocument();
    expect(await screen.findByText(/3/i)).toBeInTheDocument();
    expect(await screen.findByText(/4/i)).toBeInTheDocument();
    expect(await screen.findByText(/user67/i)).toBeInTheDocument();
    expect(await screen.findByText(/some info76/i)).toBeInTheDocument();
    expect(await screen.findByText(/user98/i)).toBeInTheDocument();
    expect(await screen.findByText(/some info89/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    mswServer.use(fetchAssetEmptyResponse);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
