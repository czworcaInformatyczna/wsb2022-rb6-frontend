import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Table,
  TableBody,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { ActionMenu } from 'components/Elements/DetailsActionMenu/ActionMenu';
import { useDeleteRole } from '../api';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { getVariant } from 'utils';
import { useGetAssetsDataById } from 'features/assets';
import { type IRole } from '../types';
import { LoadingScreen } from 'components/Elements/Loading';
import TableRowTemplate from 'components/Elements/Table/tableRow';

export const RoleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteRole = useDeleteRole();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const { data: role, isLoading } = useGetAssetsDataById<IRole>(
    Number(id),
    apiUrl.roles + '/' + id,
  );

  useEffect(() => {
    if (!Number(id)) {
      navigate(routePath.pageNotFound);
    }
  }, [id, navigate]);

  const handleDeleteRole = () => {
    const bgColor = { sx: { backgroundColor: theme.palette.background.paper } };
    confirm({
      title: (
        <Box component="span" sx={{ color: 'error.main' }}>
          Are you sure?
        </Box>
      ),
      description: (
        <Box component="span" sx={{ color: theme.palette.text.primary }}>
          This action is permanent!
        </Box>
      ),
      contentProps: bgColor,
      titleProps: bgColor,
      dialogActionsProps: bgColor,
      confirmationButtonProps: { variant: 'contained', color: 'success' },
      cancellationButtonProps: { variant: 'contained', color: 'error' },
    })
      .then(() => {
        deleteRole.mutate(id, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Role has been deleted', { variant });
            navigate(routePath.roles);
          },
        });
        return null;
      })
      .catch(() => {});
  };

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      {isLoading ? (
        <LoadingScreen displayText />
      ) : (
        <Grid alignItems="center" container direction="row" justifyContent="left">
          <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
            <Typography ml={2} mt={2} variant="h4" color="primary.main">
              Role - {role?.role.name}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xl={6} xs={6} display="flex" justifyContent="flex-end">
            <ActionMenu>
              <MenuItem onClick={() => navigate('/Roles/Edit/' + id)}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteRole}>Delete</MenuItem>
            </ActionMenu>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Divider />
            <Grid alignItems="center" container direction="row" justifyContent="center" mb={2}>
              <Grid
                item
                lg={6}
                md={6}
                sm={11}
                xl={6}
                xs={11}
                justifySelf="center"
                alignSelf="center"
              >
                <Typography mt={2} variant="h5" color="primary.main">
                  Permissions
                </Typography>
                <Table
                  sx={{
                    backgroundColor: 'background.default',
                  }}
                >
                  <TableBody>
                    {role?.rolePermissions.map((permission, index) => {
                      return (
                        <TableRowTemplate
                          name=""
                          value={permission.name}
                          even={index % 2 === 0 ? false : true}
                          keyWidth="        %"
                          valueWidth="65%"
                          key={permission.id}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
