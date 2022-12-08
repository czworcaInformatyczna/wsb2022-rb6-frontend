import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import { type ILicense } from 'features/licenses';
import { Link } from 'react-router-dom';
import { routePath } from 'routes';
import { convertUrl } from 'utils';

const UserLicenses = ({ licenses }: { licenses: ILicense[] }) => {
  return (
    <Box>
      {licenses.length === 0 ? (
        <NoResult />
      ) : (
        <Grid alignItems="center" container direction="row" mb={2}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <TableContainer sx={{ maxHeight: 440, p: 1 }}>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {licenses.map((license) => {
                    return (
                      <TableRow key={license.id}>
                        <TableCell>
                          <Link to={convertUrl(routePath.licenseDetails, { id: license.id })}>
                            <Typography color="text.primary"> {license.name} </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={convertUrl(routePath.assetDetails, { id: license.id })}>
                            <Typography color="text.primary"> {license.product_key} </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.primary">{license.expiration_date} </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UserLicenses;
