import { Box, Table, TableBody, TableRow, TableCell, Grid, Typography } from '@mui/material';
import {
  getAssetDetails,
  getAssetPhoto,
  getAssetQRCode,
} from 'features/assets/api/getAssetDetails';
import { useQuery } from 'react-query';
import { StatusChip } from '../StatusChip';

export const AssetInfo = ({ id }: { id: number }) => {
  const { data: assetDetails } = useQuery(
    ['AssetDetails', id],
    async () => await getAssetDetails(id),
  );

  const { data: assetImage } = useQuery(['AssetImage', id], async () => await getAssetPhoto(id));
  const { data: assetQRCode } = useQuery(['AssetQRCode', id], async () => await getAssetQRCode(id));
  return (
    <Box mb={4}>
      {assetDetails === undefined ? (
        <Box>No info provided</Box>
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={7} md={7} sm={12} xl={7} xs={12}>
            <Table
              sx={{
                backgroundColor: 'background.default',
              }}
            >
              <TableBody>
                {assetDetails.keys.map((row: any, i) => (
                  <TableRow
                    key={row}
                    sx={{
                      // style type 1
                      // borderBottom: '1.03px solid ',
                      // borderBottomColor: 'primary.main',

                      // style type 2
                      borderBottom: 'none',
                      backgroundColor: i % 2 ? 'background.paper' : 'background.default',
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: '35%' }}>
                      <Typography fontWeight="bold">{row}</Typography>
                    </TableCell>
                    <TableCell align="left" sx={{ width: '65%' }}>
                      {row === 'Status'
                        ? StatusChip(assetDetails.values[i].toString())
                        : assetDetails.values[i]}
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
                container
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
                container
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
