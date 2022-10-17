/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { AppProvider } from 'providers/AppProvider';
import { AssetInfo } from '../detailsComponents/AssetInfo';

import * as getDetails from 'features/assets/api/getAssetDetails';
import { AssetInfoData } from '../__test__/mockedData';

const callApiDetails = jest.spyOn(getDetails, 'getAssetDetails');

const Provider = () => {
  return (
    <AppProvider>
      <AssetInfo id={1} />
    </AppProvider>
  );
};

describe('AssetInfo', () => {
  it('should display all data', async () => {
    callApiDetails.mockImplementation(async () => await Promise.resolve(AssetInfoData));
    await act(async () => {
      render(<Provider />);
    });

    expect(await screen.findByText(/idmock/i)).toBeInTheDocument();
    expect(await screen.findByText(/idValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/nameMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/nameValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/SerialMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/serialValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/ModelMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/modelValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/ManufacturerMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/ManufacturerValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/CategoryMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/categoryValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/StatusMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ready to deploy/i)).toBeInTheDocument();
    expect(await screen.findByText(/AssetTagMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/assetTagValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/NotesMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/notesValue/i)).toBeInTheDocument();
    expect(await screen.findByText(/WarantyMock/i)).toBeInTheDocument();
    expect(await screen.findByText(/warantValue/i)).toBeInTheDocument();
  });
});