/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { AppProvider } from 'providers/AppProvider';
import { AssetLicenses } from '../detailsComponents/AssetLicenses';

import * as getDetails from 'features/assets/api/getAssetDetails';
import { AssetLicensesMock } from '../__test__/mockedData';

const callApiLicenses = jest.spyOn(getDetails, 'getAssetLicenses');

const Provider = () => {
  return (
    <AppProvider>
      <AssetLicenses id={1} />
    </AppProvider>
  );
};

describe('AssetLicenses', () => {
  it('should display licenses', async () => {
    callApiLicenses.mockImplementation(async () => await Promise.resolve(AssetLicensesMock));
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/license1/i)).toBeInTheDocument();
    expect(await screen.findByText(/license2/i)).toBeInTheDocument();
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/key/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    callApiLicenses.mockImplementation(async () => await Promise.resolve([]));
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
