import { Box, Table, TableBody, Grid, TableHead, TableRow, TableCell, Button } from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import { type ILicenseDeploys } from 'features/licenses/types';
import { apiUrl } from 'routes';

export const LicenseDeployment = ({ id }: { id: number }) => {
  const { data: licenseDeploys } = useGetAssetsDataById<ILicenseDeploys[]>(
    Number(id),
    apiUrl.licenseDeploys,
  );

  return (
    <Box mb={4}>
      {licenseDeploys === undefined || licenseDeploys.length === 0 ? (
        <NoResult />
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={11} md={11} sm={12} xl={11} xs={12}>
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
                  <TableCell width="10%">Id</TableCell>
                  <TableCell>Deployed to</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell width="10%">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {licenseDeploys.map((deploy) => {
                  return (
                    <TableRow key={deploy.id}>
                      <TableCell>{deploy.id}</TableCell>
                      <TableCell>{deploy.deployed_to.name}</TableCell>
                      <TableCell>{deploy.notes}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="primary" disabled={deploy.is_deployed}>
                          Checkout
                        </Button>
                      </TableCell>
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

// id: number;
// notes: string;
// orderNumber: number;
