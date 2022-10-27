import { Box, Table, TableBody, Grid } from '@mui/material';
import TableRowTemplate from 'components/Elements/Table/tableRow';
import { useGetAssetsDataById } from 'features/assets/api';
import { type ILicenseDetails } from 'features/licenses/types';
import { apiUrl } from 'routes';

export const LicenseInfo = ({ id }: { id: number }) => {
  const { data: licenseDetails } = useGetAssetsDataById<ILicenseDetails>(
    Number(id),
    apiUrl.licenseInfo,
  );

  return (
    <Box mb={4}>
      {licenseDetails === undefined ? (
        <Box>No info provided</Box>
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={11} md={11} sm={12} xl={11} xs={12}>
            <Table
              sx={{
                backgroundColor: 'background.default',
              }}
            >
              <TableBody>
                <TableRowTemplate
                  name="Name"
                  value={licenseDetails.name}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Manufacturer"
                  value={licenseDetails.manufacturer}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Key"
                  value={licenseDetails.key}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Category"
                  value={licenseDetails.category}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Expiration date"
                  value={licenseDetails.expiration_date}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Licensed to"
                  value={licenseDetails.licensed_to}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Quantity"
                  value={licenseDetails.quantity}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Available"
                  value={licenseDetails.available}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Deployed"
                  value={licenseDetails.deployed}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Purchase cost"
                  value={licenseDetails.purchaseCost}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Order number"
                  value={licenseDetails.order_number}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Notes"
                  value={licenseDetails.notes}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
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
