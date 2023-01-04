/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { LicenseDeployment } from '../DetailsComponents/LicenseDeployment';
import { fetchAssetEmptyResponse, fetchLicenseDeployment } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <LicenseDeployment reassignable id={1} isManage />
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

    expect(await screen.findByText(/deployed to/i)).toBeInTheDocument();
    expect(await screen.findByText(/type/i)).toBeInTheDocument();
    expect(await screen.findByText(/action/i)).toBeInTheDocument();

    // Table Body

    expect(await screen.findByText(/test@gmail.com/i)).toBeInTheDocument();
    expect(await screen.findByText(/user/i)).toBeInTheDocument();
    expect(await screen.findByText(/laptop/i)).toBeInTheDocument();
    expect(await screen.findByText(/asset/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    mswServer.use(fetchAssetEmptyResponse);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
