import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { SelectInput, TextInput } from 'components/Elements/FormInputs';
import { LoadingScreen } from 'components/Elements/Loading';
import { useGetAssetsDataById } from 'features/assets';
import { type IsModal } from 'features/manufacturer/types';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { getVariant } from 'utils';
import { type IRole, type IAddRole, type IRoleForm } from '../types';
import { useAddRole, useGetPermissions, useUpdateRole } from '../api';

export const AddRole = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IRoleForm>();
  const { handleSubmit, setError, reset } = methods;
  const addRole = useAddRole<IAddRole>(apiUrl.roles);
  const updateRole = useUpdateRole<IAddRole>();
  const { data: permissionsOptions } = useGetPermissions();
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: role, refetch } = useGetAssetsDataById<IRole>(
    Number(id),
    apiUrl.roles + '/' + id,
    action === 'Add' ? false : true,
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );

  const setValues = useCallback(
    (data: IRole) => {
      reset({
        name: data.role.name,
        permissions: data.rolePermissions,
      });
    },
    [reset],
  );

  useEffect(() => {
    reset();
    const isEdit = location.pathname.includes('Roles/Edit');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setLoading(true);

      setAction('Edit');
      if (role !== undefined) {
        void refetch();
        setValues(role);
        setLoading(false);
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [role, id, isIdNotValid, location.pathname, navigate, refetch, reset, setValues]);

  const onSubmit = async (data: IRoleForm) => {
    const tempData = {
      name: data.name,
      permissions: data.permissions.map((perm) => perm.name),
    };

    if (action === 'Add')
      addRole.mutate(tempData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('Role has been added', { variant });
          reset();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          setError('name', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });

    if (action === 'Edit' && id)
      updateRole.mutate(
        { id: id, body: tempData },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Role has been updated', { variant });
            navigate(routePath.roles);
          },
          onError(error) {
            const e: { message: string } = error.response?.data as { message: string };
            setError('name', { type: 'server', message: e.message }, { shouldFocus: false });
          },
        },
      );
  };

  return (
    <Box
      alignSelf="center"
      sx={{
        width: isModal ? '100%' : { lg: '60%', xs: '100%' },
        flexGrow: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      {loading && <LoadingScreen displayText />}
      {!loading && (
        <Box>
          <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
            <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
              <Typography ml={2} variant="h4">
                {action} Role
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: '100%',
              }}
            >
              <Grid alignContent="center" container display="flex" item mt={2} spacing={2}>
                <TextInput label="Name" name="name" rules={{ required: 'Required value' }} />
                <SelectInput
                  label="Permissions"
                  name="permissions"
                  options={permissionsOptions ? permissionsOptions : []}
                  createButton={false}
                  multipleValues
                />
                <Grid
                  alignContent="center"
                  display="flex"
                  item
                  justifyContent="flex-end"
                  lg={12}
                  mb={2}
                  md={12}
                  sm={12}
                  xl={12}
                  xs={12}
                >
                  <Button
                    color="success"
                    type="submit"
                    variant="contained"
                    sx={{
                      marginRight: 2,
                    }}
                  >
                    {action}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
};
