/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { AppProvider } from 'providers/AppProvider';
import { AssetHistory } from '../detailsComponents/AssetHistory';

const Provider = () => {
  return (
    <AppProvider>
      <AssetHistory id={1} />
    </AppProvider>
  );
};

describe('AssetHistory', () => {
  it('should display history', async () => {
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
    expect(await screen.findByText('22/10/2022')).toBeInTheDocument();
    expect(await screen.findByText(/Admin/i)).toBeInTheDocument();
    expect(await screen.findByText(/Deploy/i)).toBeInTheDocument();
    expect(await screen.findByText(/Wojtek1/i)).toBeInTheDocument();
    expect(await screen.findByText(/some info/i)).toBeInTheDocument();
  });

  it.skip('should display no result', async () => {
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
