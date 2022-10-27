import { Box, Table, TableBody, TableRow, TableCell, Grid, TableHead } from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import { type IAssetMaintenances } from 'features/assets/types';
import NoResult from './noResult';
import { apiUrl } from 'routes';
import { isArrayEmpty } from 'utils';

export const AssetMaintenance = ({ id }: { id: number }) => {
  const { data: maintenances } = useGetAssetsDataById<IAssetMaintenances[]>(
    Number(id),
    apiUrl.assetMaintenances,
  );

  return (
    <Box mb={4}>
      {isArrayEmpty(maintenances) ? (
        <NoResult />
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Table
              sx={{
                backgroundColor: 'background.default',
              }}
            >
              <TableHead
                sx={{
                  backgroundColor: 'secondary.main',
                }}
              >
                <TableRow>
                  <TableCell width="20%">Title</TableCell>
                  <TableCell width="10%">Maintenance type</TableCell>
                  <TableCell width="10%">Start date</TableCell>
                  <TableCell width="10%">End date</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maintenances?.map((action: any) => {
                  return (
                    <TableRow key={action.id}>
                      <TableCell>{action.title}</TableCell>
                      <TableCell>{action.maintenanceType}</TableCell>
                      <TableCell>{action.startDate}</TableCell>
                      <TableCell>{action.endDate}</TableCell>
                      <TableCell>{action.user}</TableCell>
                      <TableCell>{action.notes}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
