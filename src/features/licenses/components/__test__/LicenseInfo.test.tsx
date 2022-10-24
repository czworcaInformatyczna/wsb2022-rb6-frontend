/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { LicenseInfo } from '../detailsComponents/LicenseInfo';
import { fetchLicenseDetails } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <LicenseInfo id={1} />
    </AppProvider>
  );
};

describe('LicenseInfo', () => {
  it('should display all data', async () => {
    mswServer.use(fetchLicenseDetails);
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Photoshop/i)).toBeInTheDocument();
    expect(await screen.findByText(/manufacturer/i)).toBeInTheDocument();
    expect(await screen.findByText(/adobe/i)).toBeInTheDocument();
    expect(await screen.findByText(/key/i)).toBeInTheDocument();
    expect(await screen.findByText(/ASD-ASD-343-SDF/i)).toBeInTheDocument();
    expect(await screen.findByText(/category/i)).toBeInTheDocument();
    expect(await screen.findByText(/Graphic/i)).toBeInTheDocument();
    expect(await screen.findByText(/expiration date/i)).toBeInTheDocument();
    expect(await screen.findByText('22/10/2033')).toBeInTheDocument();
    expect(await screen.findByText(/licensed to/i)).toBeInTheDocument();
    expect(await screen.findByText('user@user.com')).toBeInTheDocument();
    expect(await screen.findByText(/quantity/i)).toBeInTheDocument();
    expect(await screen.findByText(/8/i)).toBeInTheDocument();
    expect(await screen.findByText(/available/i)).toBeInTheDocument();
    expect(await screen.findByText(/5/i)).toBeInTheDocument();
    expect(await screen.findByText(/deployed/i)).toBeInTheDocument();
    expect(await screen.findByText(/30/i)).toBeInTheDocument();
    expect(await screen.findByText(/purchase cost/i)).toBeInTheDocument();
    expect(await screen.findByText(/200/i)).toBeInTheDocument();
    expect(await screen.findByText(/order number/i)).toBeInTheDocument();
    expect(await screen.findByText(/12312sad/i)).toBeInTheDocument();
    expect(await screen.findByText(/notes/i)).toBeInTheDocument();
    expect(await screen.findByText(/some info/i)).toBeInTheDocument();
  });
});
