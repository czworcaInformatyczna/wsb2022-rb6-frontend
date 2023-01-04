/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { licenseDetailsMock } from 'mocks';
import { mswServer } from 'mocks/mswServer';
import { AppProvider } from 'providers/AppProvider';
import { LicenseInfo } from '../DetailsComponents/LicenseInfo';
import { fetchLicenseDetails } from './mockApiHandlers';

const Provider = () => {
  return (
    <AppProvider>
      <LicenseInfo licenseDetails={licenseDetailsMock} />
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
    expect(await screen.findByText('2033-10-22T00:00')).toBeInTheDocument();
    expect(await screen.findByText(/licensed to/i)).toBeInTheDocument();
    expect(await screen.findByText('user@user.com')).toBeInTheDocument();
    expect(await screen.findByText(/number of slots/i)).toBeInTheDocument();
    expect(await screen.findByText(/5/i)).toBeInTheDocument();
    expect(await screen.findByText(/free slots/i)).toBeInTheDocument();
    expect(await screen.findByText(/30/i)).toBeInTheDocument();
  });
});
