/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { AppProvider } from 'providers/AppProvider';
import { AssetFiles } from '../detailsComponents/AssetFiles';

const Provider = () => {
  return (
    <AppProvider>
      <AssetFiles id={1} />
    </AppProvider>
  );
};

describe('AssetFiles', () => {
  it('should display files', async () => {
    await act(async () => {
      render(<Provider />);
    });
    // Table Head
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(await screen.findByText(/extension/i)).toBeInTheDocument();
    expect(await screen.findByText(/size/i)).toBeInTheDocument();
    expect(await screen.findByText(/upload date/i)).toBeInTheDocument();

    // Table Body
    expect(await screen.findByText(/file1/i)).toBeInTheDocument();
    expect(await screen.findByText(/.txt/i)).toBeInTheDocument();
    expect(await screen.findByText(/5kb/i)).toBeInTheDocument();
    expect(await screen.findByText('22/10/2022')).toBeInTheDocument();
  });

  it.skip('should display no result', async () => {
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
});
