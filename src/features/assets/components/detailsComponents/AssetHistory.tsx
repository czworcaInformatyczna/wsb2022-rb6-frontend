import { Box, Table, TableBody, TableRow, TableCell, Grid, TableHead } from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import { type IAssetHistory } from 'features/assets/types';
import { apiUrl } from 'routes';
import NoResult from './noResult';

export const AssetHistory = ({ id }: { id: number }) => {
  const { data: history } = useGetAssetsDataById<IAssetHistory[]>(Number(id), apiUrl.assetHistory);

  return (
    <Box mb={4}>
      {history === undefined || history.length === 0 ? (
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
                  <TableCell width="10%">Date</TableCell>
                  <TableCell width="10%">User</TableCell>
                  <TableCell width="15%">Action</TableCell>
                  <TableCell>Target</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((action: any) => {
                  return (
                    <TableRow key={action.id}>
                      <TableCell>{action.date}</TableCell>
                      <TableCell>{action.user}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>{action.target}</TableCell>
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
