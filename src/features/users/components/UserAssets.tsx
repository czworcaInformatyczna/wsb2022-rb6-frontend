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
import { type IAssetDetails } from 'features/assets';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import { Link } from 'react-router-dom';
import { routePath } from 'routes';
import { convertUrl } from 'utils';

const UserAssets = ({ assets }: { assets: IAssetDetails[] }) => {
  return (
    <Box>
      {assets.length === 0 ? (
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
                    <TableCell>Tag</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Serial</TableCell>
                    <TableCell>Model</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.map((asset) => {
                    return (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <Link to={convertUrl(routePath.assetDetails, { id: asset.id })}>
                            <Typography color="text.primary"> {asset.tag} </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={convertUrl(routePath.assetDetails, { id: asset.id })}>
                            <Typography color="text.primary"> {asset.name} </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={convertUrl(routePath.assetDetails, { id: asset.id })}>
                            <Typography color="text.primary"> {asset.serial} </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>{asset.asset_model.name}</TableCell>
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

export default UserAssets;
