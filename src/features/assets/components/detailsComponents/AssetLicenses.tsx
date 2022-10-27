import { Box, Table, TableBody, TableRow, TableCell, Grid, TableHead, Button } from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import { type IAssetLicenses } from 'features/assets/types';
import { apiUrl } from 'routes';
import { isArrayEmpty } from 'utils';
import NoResult from './noResult';

export const AssetLicenses = ({ id }: { id: number }) => {
  const { data: licenses } = useGetAssetsDataById<IAssetLicenses[]>(
    Number(id),
    apiUrl.assetLicenses,
  );
  const removeLicense = (licenseId: number) => {
    console.log(licenseId);
  };

  return (
    <Box mb={4}>
      {isArrayEmpty(licenses) ? (
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
                  <TableCell>Name</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell>Expiration date</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {licenses?.map((license: any) => {
                  return (
                    <TableRow key={license.id}>
                      <TableCell>{license.name}</TableCell>
                      <TableCell>{license.key}</TableCell>
                      <TableCell>{license.expiration_date}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="error"
                          onClick={() => removeLicense(license.id)}
                          variant="contained"
                        >
                          Remove
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
