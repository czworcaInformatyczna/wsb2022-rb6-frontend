import { Box, Grid, Table, TableBody } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableRowTemplate from 'components/Elements/Table/tableRow';
import { Link } from 'react-router-dom';
import { routePath } from 'routes';
import { type IUser } from '../types';

const UserInformations = ({
  user,
  image,
  showLinks = false,
}: {
  image?: JSX.Element;
  showLinks?: boolean;
  user: IUser;
}) => {
  const getRoles = () => {
    let roles = '';
    user.roles.map((role) => (roles += role.name));
    return roles;
  };

  return (
    <Box>
      <Grid alignItems="center" container direction="row" mb={2}>
        <Grid item lg={7} md={7} sm={11} xl={7} xs={11}>
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
              {image}
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
              {showLinks ? (
                <Box>
                  <Box
                    component={Link}
                    sx={{ color: 'text.primary' }}
                    to={routePath.changePassword}
                  >
                    <Typography>Change password</Typography>
                  </Box>
                  <Box component={Link} sx={{ color: 'text.primary' }} to={routePath.avatar}>
                    <Typography>Upload avatar</Typography>
                  </Box>
                  <Box component={Link} sx={{ color: 'text.primary' }} to={routePath.phoneNumber}>
                    <Typography>Update phone number</Typography>
                  </Box>
                </Box>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserInformations;
