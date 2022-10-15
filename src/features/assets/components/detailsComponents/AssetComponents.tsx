import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  Button,
  Typography,
} from '@mui/material';
import { getAssetComponents } from 'features/assets/api/getAssetDetails';
import { useQuery } from 'react-query';

export const AssetComponents = ({ id }: { id: number }) => {
  const { data: components } = useQuery(
    ['AssetComponents', id],
    async () => await getAssetComponents(id),
  );

  const removeLicense = (licenseId: number) => {
    console.log(licenseId);
  };

  return (
    <Box mb={4}>
      {components === undefined || components.length === 0 ? (
        <Box
          m={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'secondary.main',
            minHeight: '50px',
            borderRadius: 1,
          }}
        >
          <Typography m={2}>No Results</Typography>
        </Box>
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Table
              sx={{
                backgroundColor: 'background.default',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Serial</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {components.map((license: any) => {
                  return (
                    <TableRow key={license.id}>
                      <TableCell>{license.name}</TableCell>
                      <TableCell>{license.serial}</TableCell>

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
