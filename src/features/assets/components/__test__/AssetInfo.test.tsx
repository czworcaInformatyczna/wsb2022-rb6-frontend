/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, act } from '@testing-library/react';
import { useQuery } from 'react-query';
import { AppProvider } from 'providers/AppProvider';
import user from '@testing-library/user-event';
import { AssetInfo } from '../detailsComponents/AssetInfo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { type AppProviderProps } from 'providers/types';
import * as getDetails from 'features/assets/api/getAssetDetails';
import { AssetInfoData } from '../__test__/mockedData';

const callApi = jest.spyOn(getDetails, 'getAssetDetails');

const Provider = ({ children }: AppProviderProps) => {
  return <AppProvider>{children}</AppProvider>;
};

describe('AddAsset form', () => {
  it('should render all inputs', async () => {
    callApi.mockImplementation(async (id) => await Promise.resolve(AssetInfoData));
    await act(async () => {
      render(
        <Provider>
          <AssetInfo id={1} />
        </Provider>,
      );
    });
    // const test = getDetails.getAssetDetails(1);
    // console.log(test);
    const el = await screen.findByText(/idmock/i);
    expect(el).toBeInTheDocument();
  });
});
