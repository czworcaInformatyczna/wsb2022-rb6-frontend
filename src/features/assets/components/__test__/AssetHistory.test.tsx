/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { AppProvider } from 'providers/AppProvider';
import { AssetHistory } from '../detailsComponents/AssetHistory';

import * as getDetails from 'features/assets/api/getAssetDetails';
import { AssetHistoryMock } from './mockedData';

const callApiHistory = jest.spyOn(getDetails, 'getAssetHistory');

const Provider = () => {
  return (
    <AppProvider>
      <AssetHistory id={1} />
    </AppProvider>
  );
};

describe('AssetHistory', () => {
  it('should display history', async () => {
    callApiHistory.mockImplementation(async () => await Promise.resolve(AssetHistoryMock));
    await act(async () => {
      render(<Provider />);
    });
    // Table Head
    expect(await screen.findByText(/date/i)).toBeInTheDocument();
    expect(await screen.findByText(/user/i)).toBeInTheDocument();
    expect(await screen.findByText(/action/i)).toBeInTheDocument();
    expect(await screen.findByText(/target/i)).toBeInTheDocument();
    expect(await screen.findByText(/notes/i)).toBeInTheDocument();

    // Table Body
    expect(await screen.findByText(/10 10 2022/i)).toBeInTheDocument();
    expect(await screen.findByText(/11 10 2022/i)).toBeInTheDocument();
    expect(await screen.findByText(/usr1/i)).toBeInTheDocument();
    expect(await screen.findByText(/admin/i)).toBeInTheDocument();
    expect(await screen.findByText(/request/i)).toBeInTheDocument();
    expect(await screen.findByText(/deploy/i)).toBeInTheDocument();
    expect(await screen.findByText(/usr2/i)).toBeInTheDocument();
    expect(await screen.findByText(/some info/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    callApiHistory.mockImplementation(async () => await Promise.resolve([]));
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
