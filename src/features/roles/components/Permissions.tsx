import { Box, Grid, Table, TableBody, TableContainer, Typography } from '@mui/material';
import TableRowTemplate from 'components/Elements/Table/tableRow';
import { type TPermissions } from '../types';

const Permissions = ({ role }: { role: TPermissions | [] }) => {
  return (
    <Box>
      <Grid alignItems="center" container direction="row" justifyContent="center" mb={2}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12} justifySelf="center" alignSelf="center">
          <Typography mt={2} variant="h5" color="primary.main">
            Permissions
          </Typography>
          <TableContainer sx={{ p: 1 }}>
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
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Permissions;
