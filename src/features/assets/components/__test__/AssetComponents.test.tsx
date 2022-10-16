/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { AppProvider } from 'providers/AppProvider';
import { AssetComponents } from '../detailsComponents/AssetComponents';
import * as getDetails from 'features/assets/api/getAssetDetails';
import { AssetComponentsMock } from './mockedData';

const callApiComponents = jest.spyOn(getDetails, 'getAssetComponents');

const Provider = () => {
  return (
    <AppProvider>
      <AssetComponents id={1} />
    </AppProvider>
  );
};

describe('AssetComponents', () => {
  it('should display components', async () => {
    callApiComponents.mockImplementation(async () => await Promise.resolve(AssetComponentsMock));
    await act(async () => {
      render(<Provider />);
    });
    // Table Head
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/serial/i)).toBeInTheDocument();
    // Table Body
    expect(await screen.findByText(/namMock1/i)).toBeInTheDocument();
    expect(await screen.findByText(/serMock1/i)).toBeInTheDocument();
    expect(await screen.findByText(/catMock1/i)).toBeInTheDocument();
    expect(await screen.findByText(/namMock2/i)).toBeInTheDocument();
    expect(await screen.findByText(/serMock2/i)).toBeInTheDocument();
    expect(await screen.findByText(/catMock2/i)).toBeInTheDocument();
  });

  it('should display no result', async () => {
    callApiComponents.mockImplementation(async () => await Promise.resolve([]));
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
