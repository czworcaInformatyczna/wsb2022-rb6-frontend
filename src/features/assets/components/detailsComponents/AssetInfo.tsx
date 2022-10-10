import { Box, Table, TableBody, TableRow, TableCell, Grid } from '@mui/material';
import {
  getAssetDetails,
  getAssetPhoto,
  getAssetQRCode,
} from 'features/assets/api/getAssetDetails';
import { useQuery } from 'react-query';

export const AssetInfo = () => {
  const { data: assetDetails } = useQuery('AssetDetails', getAssetDetails);
  const { data: assetImage } = useQuery('AssetImage', getAssetPhoto);
  const { data: assetQRCode } = useQuery('AssetQRCode', getAssetQRCode);
  return (
    <Box mb={4}>
      {assetDetails === undefined ? (
        <Box>No info provided</Box>
      ) : (
        <Grid alignItems="center" container pt={2} spacing={0}>
          <Grid item lg={7} md={7} sm={12} xl={7} xs={12}>
            <Table>
              <TableBody>
                {assetDetails.keys.map((row: any, i) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                      {row}
                    </TableCell>
                    <TableCell align="left" sx={{ width: '65%' }}>
                      {assetDetails.values[i]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xl={5} xs={12} alignSelf="start">
            <Grid container spacing={4}>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xl={12}
                xs={12}
                display="flex"
                direction="column"
                alignItems="center"
              >
                {assetImage && <img src={assetImage.image} width="80%" alt="Asset" />}
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xl={12}
                xs={12}
                display="flex"
                direction="column"
                alignItems="center"
              >
                {assetQRCode && <img src={assetQRCode.QRCode} width="50%" alt="QRCode" />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
