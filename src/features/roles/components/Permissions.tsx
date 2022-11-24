import { Box, Grid, Table, TableBody, Typography } from '@mui/material';
import TableRowTemplate from 'components/Elements/Table/tableRow';
import { type TPermissions } from '../types';

const Permissions = ({ role }: { role: TPermissions | [] }) => {
  return (
    <Box>
      <Grid alignItems="center" container direction="row" justifyContent="center" mb={2}>
        <Grid item lg={6} md={6} sm={11} xl={6} xs={11} justifySelf="center" alignSelf="center">
          <Typography mt={2} variant="h5" color="primary.main">
            Permissions
          </Typography>
          <Table
            sx={{
              backgroundColor: 'background.default',
            }}
          >
            <TableBody>
              {role.map((permission, index) => {
                return (
                  <TableRowTemplate
                    name=""
                    value={permission.name}
                    even={index % 2 === 0 ? false : true}
                    keyWidth="35%"
                    valueWidth="65%"
                    key={permission.id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Permissions;
