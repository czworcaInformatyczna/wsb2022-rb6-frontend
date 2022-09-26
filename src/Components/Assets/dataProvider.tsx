import { Box } from '@mui/material';
import Assets from './Assets';
import { type IDataProvider, type DataProviderProps } from './domain';
import StatusChip from './StatusChip';

export const DataProvider = (Props: DataProviderProps) => {
  let data: IDataProvider;

  return (
    <Box>
      {(() => {
        switch (Props.link) {
          case 'Assets':
            data = {
              name: 'Assets',
              columns: [
                { field: 'id', width: 90 },
                { field: 'name', width: 200 },
                {
                  field: 'image',
                  width: 150,
                  sortable: false,
                  disableExport: true,

                  renderCell: (params) => (
                    <img
                      alt="Asset"
                      src={params.value}
                      style={{
                        width: '100%',
                        height: undefined,
                      }}
                    />
                  ),
                },
                { field: 'serial', width: 200 },
                { field: 'model', width: 200 },
                { field: 'manufacturer', width: 200 },
                { field: 'category', width: 200 },
                {
                  field: 'status',
                  width: 150,

                  renderCell: (params) => StatusChip(params.value),
                },
              ],
            };
            return <Assets data={data} />;
          default:
            return null;
        }
      })()}
    </Box>
  );
};
