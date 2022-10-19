import { Box, Table, TableBody, TableRow, TableCell, Grid, TableHead, Button } from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import NoResult from './noResult';
import { apiUrl } from 'routes';
import { type IAssetComponents } from 'features/assets/types';

export const AssetComponents = ({ id }: { id: number }) => {
  const { data: components } = useGetAssetsDataById<IAssetComponents[]>(
    Number(id),
    apiUrl.assetComponents,
  );

  const removeLicense = (licenseId: number) => {
    console.log(licenseId);
  };

  return (
    <Box mb={4}>
      {components === undefined || components.length === 0 ? (
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
                  <TableCell>Serial</TableCell>
                  <TableCell>Category </TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {components.map((license: any) => {
                  return (
                    <TableRow key={license.id}>
                      <TableCell>{license.name}</TableCell>
                      <TableCell>{license.serial}</TableCell>
                      <TableCell>{license.category}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="error"
                          onClick={() => removeLicense(license.id)}
                          variant="contained"
                        >
                          Return
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
