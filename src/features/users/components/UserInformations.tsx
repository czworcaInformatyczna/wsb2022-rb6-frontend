import { Box, Grid, Table, TableBody } from '@mui/material';
import TableRowTemplate from 'components/Elements/Table/tableRow';
import { type IUser } from '../types';

const UserInformations = ({ user }: { user: IUser }) => {
  const getRoles = () => {
    let roles = '';
    user.roles.map((role) => (roles += role.name));
    return roles;
  };

  return (
    <Box>
      <Grid alignItems="center" container direction="row" mb={2}>
        <Grid item lg={6} md={6} sm={11} xl={6} xs={11}>
          <Table
            sx={{
              backgroundColor: 'background.default',
            }}
          >
            <TableBody>
              <TableRowTemplate
                name="Full name"
                value={user.name + ' ' + user.surname}
                even={false}
                keyWidth="35%"
                valueWidth="65%"
              />
              <TableRowTemplate
                name="email"
                value={user.email}
                even
                keyWidth="35%"
                valueWidth="65%"
              />
              <TableRowTemplate
                name="Phone number"
                value={user.phone_number}
                even={false}
                keyWidth="35%"
                valueWidth="65%"
              />

              <TableRowTemplate
                name="Roles"
                value={getRoles()}
                even
                keyWidth="35%"
                valueWidth="65%"
              />
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserInformations;
