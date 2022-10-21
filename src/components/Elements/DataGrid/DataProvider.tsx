import { Box } from '@mui/material';
import { type DataProviderProps } from 'features/assets';
import { DataGridTemplate } from 'components/Elements/DataGrid';
import * as columns from './columnsData';

export const DataProvider = (Props: DataProviderProps) => {
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
            return <DataGridTemplate data={columns.AssetsData} />;
          case 'Licenses':
            return <DataGridTemplate data={columns.LicensesData} />;
          default:
            return null;
        }
      })()}
    </Box>
  );
};
