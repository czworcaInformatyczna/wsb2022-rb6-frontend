import { Box } from '@mui/material';
import { type IDataProvider, type DataProviderProps, StatusChip, Assets } from 'features/assets';

export const DataProvider = (Props: DataProviderProps) => {
  let data: IDataProvider;

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      {(() => {
        switch (Props.link) {
          case 'Assets':
            data = {
              addNewLink: '/AddAsset',
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
