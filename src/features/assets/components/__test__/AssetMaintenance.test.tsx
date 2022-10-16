/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { AppProvider } from 'providers/AppProvider';
import { AssetMaintenance } from '../detailsComponents/AssetMaintenance';

import * as getDetails from 'features/assets/api/getAssetDetails';
import { AssetMaintenanceMock } from '../__test__/mockedData';

const callApiMaintenance = jest.spyOn(getDetails, 'getAssetMaintenance');

const Provider = () => {
  return (
    <AppProvider>
      <AssetMaintenance id={1} />
    </AppProvider>
  );
};

describe('AssetMaintenance', () => {
  it('should display maintenances', async () => {
    callApiMaintenance.mockImplementation(async () => await Promise.resolve(AssetMaintenanceMock));
    await act(async () => {
      render(<Provider />);
    });

    // Table Head
    expect(await screen.findByText(/title/i)).toBeInTheDocument();
    expect(await screen.findByText(/maintenance type/i)).toBeInTheDocument();
    expect(await screen.findByText(/start date/i)).toBeInTheDocument();
    expect(await screen.findByText(/end date/i)).toBeInTheDocument();
    expect(await screen.findByText(/user/i)).toBeInTheDocument();
    expect(await screen.findByText(/notes/i)).toBeInTheDocument();
    // Table Body
    expect(await screen.findByText(/add ram/i)).toBeInTheDocument();
    expect(await screen.findByText(/broken graphic card/i)).toBeInTheDocument();
    expect(await screen.findByText(/upgrade/i)).toBeInTheDocument();
    expect(await screen.findByText(/repair/i)).toBeInTheDocument();
    expect(await screen.findByText('22/10/2022')).toBeInTheDocument();
    expect(await screen.findByText('22/09/2022')).toBeInTheDocument();
    expect(await screen.findByText('30/10/2022')).toBeInTheDocument();
    expect(await screen.findByText('30/09/2022')).toBeInTheDocument();
    expect(await screen.findByText(/usr1/i)).toBeInTheDocument();
    expect(await screen.findByText(/usr2/i)).toBeInTheDocument();
    expect(await screen.findByText(/gpu stopped working/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    callApiMaintenance.mockImplementation(async () => await Promise.resolve([]));
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
