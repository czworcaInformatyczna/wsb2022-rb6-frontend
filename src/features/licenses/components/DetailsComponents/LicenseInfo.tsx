import { Box, Table, TableBody, Grid } from '@mui/material';
import TableRowTemplate from 'components/Elements/Table/tableRow';
import { type ILicenseInfo } from 'features/licenses/types';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  licenseDetails: ILicenseInfo;
}

export const LicenseInfo = (props: IProps) => {
  return (
    <Box mb={4}>
      {props.licenseDetails === undefined ? (
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
                  value={props.licenseDetails.name}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Manufacturer"
                  value={props.licenseDetails.manufacturer.name}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Key"
                  value={props.licenseDetails.product_key}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Category"
                  value={props.licenseDetails.category.name}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Expiration date"
                  value={props.licenseDetails.expiration_date}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Licensed to"
                  value={props.licenseDetails.email}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Number of slots"
                  value={props.licenseDetails.slots}
                  even={false}
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Free slots"
                  value={props.licenseDetails.remaining_slots}
                  even
                  keyWidth="20%"
                  valueWidth="80%"
                />
                <TableRowTemplate
                  name="Reassignable"
                  value={
                    props.licenseDetails.reassignable ? (
                      <CheckIcon color="success" />
                    ) : (
                      <Box>
                        <CloseIcon color="error" />
                      </Box>
                    )
                  }
                  even={false}
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
