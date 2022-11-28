import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingScreen } from 'components/Elements/Loading';
import { useGetAssetsDataById } from 'features/assets';
import CloseIcon from '@mui/icons-material/Close';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import { type IUsers } from 'features/users/types';
import { Link } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { convertUrl, getVariant } from 'utils';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { useDeleteUserFromRole } from '../api';

const RoleUsers = ({ id, role }: { id: number; role: string }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const {
    data: users,
    isLoading,
    refetch,
  } = useGetAssetsDataById<IUsers>(Number(id), convertUrl(apiUrl.roleUsers, { id: id }));
  const removeUserRole = useDeleteUserFromRole();
  const handleRemove = (userId: number, user: string) => {
    const bgColor = { sx: { backgroundColor: theme.palette.background.paper } };
    confirm({
      title: (
        <Box component="span" sx={{ color: 'error.main' }}>
          Are you sure?
        </Box>
      ),
      description: (
        <Box component="span" sx={{ color: theme.palette.text.primary }}>
          Remove {user} from role {role}
        </Box>
      ),
      contentProps: bgColor,
      titleProps: bgColor,
      dialogActionsProps: bgColor,
      confirmationButtonProps: { variant: 'contained', color: 'success' },
      cancellationButtonProps: { variant: 'contained', color: 'error' },
    })
      .then(() => {
        removeUserRole.mutate(
          { id: userId.toString(), body: { role: role } },
          {
            onSuccess: () => {
              const variant = getVariant('success');
              enqueueSnackbar('User has been removed from role', { variant });
              void refetch();
            },
          },
        );
        return null;
      })
      .catch(() => {});
  };

  return (
    <Box>
      {isLoading ? (
        <LoadingScreen />
      ) : !users ? (
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
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>{}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.data.map((user) => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Link to={convertUrl(routePath.userDetails, { id: user.id })}>
                            <Typography color="text.primary">
                              {user.name} {user.surname}
                            </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={convertUrl(routePath.userDetails, { id: user.id })}>
                            <Typography color="text.primary"> {user.email} </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            component="label"
                            onClick={() => handleRemove(user.id, user.name + ' ' + user.surname)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </TableCell>
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

export default RoleUsers;
