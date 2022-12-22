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
import { type IAddUser, type IAddUserForm, type IUser } from '../types';
import { useAddUser, useUpdateUser, useGetRoles } from '../api';

export const AddUser = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IAddUserForm>();
  const { handleSubmit, setError, reset } = methods;
  const addUser = useAddUser<IAddUser>(apiUrl.users);
  const updateUser = useUpdateUser<IAddUser>();
  const { data: rolesOptions } = useGetRoles();
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user, refetch } = useGetAssetsDataById<IUser>(
    Number(id),
    apiUrl.users + '/' + id,
    action === 'Add' ? false : true,
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );

  const setValues = useCallback(
    (data: IUser) => {
      reset({
        name: data.name,
        email: data.email,
        surname: data.surname,
        phone_number: data.phone_number,
        roles: data.roles,
      });
    },
    [reset],
  );

  useEffect(() => {
    reset();
    const isEdit = location.pathname.includes('Users/Edit');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setLoading(true);

      setAction('Edit');
      if (user !== undefined) {
        void refetch();
        setValues(user);
        setLoading(false);
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [user, id, isIdNotValid, location.pathname, navigate, refetch, reset, setValues]);

  const onSubmit = async (data: IAddUserForm) => {
    const tempData = {
      name: data.name,
      roles: data.roles.map((role) => role.name),
      email: data.email,
      surname: data.surname,
      phone_number: data.phone_number,
    };
    if (action === 'Add')
      addUser.mutate(tempData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('User has been added', { variant });
          reset();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          setError('email', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });

    if (action === 'Edit' && id)
      updateUser.mutate(
        { id: id, body: tempData },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('User has been updated', { variant });
            navigate(routePath.users);
          },
          onError(error) {
            const e: { message: string } = error.response?.data as { message: string };
            setError('email', { type: 'server', message: e.message }, { shouldFocus: false });
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
                {action} User
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
                <TextInput
                  label="Email"
                  name="email"
                  rules={{
                    required: 'Required value',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  }}
                />
                <TextInput label="Name" name="name" rules={{ required: 'Required value' }} />
                <TextInput label="Surname" name="surname" rules={{ required: 'Required value' }} />
                <SelectInput
                  label="Roles"
                  name="roles"
                  options={rolesOptions?.data ? rolesOptions.data : []}
                  createButton={false}
                  multipleValues
                />
                <TextInput label="Phone number" name="phone_number" type="number" rules={{}} />
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
