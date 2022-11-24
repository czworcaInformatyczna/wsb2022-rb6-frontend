import { Box, Table, TableBody, Grid } from '@mui/material';
import TableRowTemplate from 'components/Elements/Table/tableRow';
import { useGetAssetsDataById } from 'features/assets/api';
import { type IAssetDetails } from 'features/assets/types';
import { apiUrl } from 'routes';
import { StatusChip } from '../StatusChip';
import { changeDateTimeFormat } from 'utils';
export const AssetInfo = ({ id }: { id: number }) => {
  const { data: assetDetails } = useGetAssetsDataById<IAssetDetails>(
    Number(id),
    apiUrl.assetInfo + id,
  );
  const { data: assetQRCode } = useGetAssetsDataById<any>(
    Number(id),
    apiUrl.assetInfo + id + '/qr',
  );

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
                <TableRowTemplate
                  name="Id"
                  value={assetDetails.id}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Tag"
                  value={assetDetails.tag}
                  even
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Name"
                  value={assetDetails.name}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Serial"
                  value={assetDetails.serial}
                  even
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Model"
                  value={assetDetails.asset_model.name}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Manufacturer"
                  value={assetDetails.asset_model.manufacturer.name}
                  even
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Category"
                  value={assetDetails.asset_model.category.name}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Status"
                  value={StatusChip(assetDetails.status)}
                  even
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Notes"
                  value={assetDetails.notes}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Waranty"
                  value={StatusChip(assetDetails.warranty)}
                  even
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Order number"
                  value={assetDetails.order_number}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Date of purchase"
                  value={assetDetails.purchase_date}
                  even
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Purchase cost"
                  value={assetDetails.price}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Created at"
                  value={changeDateTimeFormat(assetDetails.created_at)}
                  even
                  keyWidth="35%"
                  valueWidth="65%"
                />
                <TableRowTemplate
                  name="Assigned to"
                  value={assetDetails.current_holder ? assetDetails.current_holder.email : ''}
                  even={false}
                  keyWidth="35%"
                  valueWidth="65%"
                />
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
                <img
                  src={'http://137.74.158.36:81/storage/' + assetDetails.image}
                  width="70%"
                  alt="Asset"
                />
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
                {assetQRCode && (
                  <img
                    style={{ border: '2px solid white' }}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(assetQRCode)}`}
                    width="50%"
                    alt="QRCode"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
