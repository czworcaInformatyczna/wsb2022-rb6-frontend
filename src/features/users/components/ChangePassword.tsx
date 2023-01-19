import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { TextInput } from 'components/Elements/FormInputs';
import { type IsModal } from 'features/manufacturer/types';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { getVariant } from 'utils';
import { useChangePassword } from '../api';
import { type IChangePassword } from '../types';

export const ChangePassword = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IChangePassword>();
  const { handleSubmit, setError, reset, getValues } = methods;
  const changePassword = useChangePassword<IChangePassword>();

  const onSubmit = async (data: IChangePassword) => {
    if (getValues('password') === getValues('password_confirmation'))
      changePassword.mutate(
        { id: '', body: data },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Password has been changed', { variant });
            reset();
          },
          onError(error) {
            const e: { message: string } = error.response?.data as { message: string };
            setError('password', { type: 'server', message: e.message }, { shouldFocus: false });
          },
        },
      );
    else setError('password_confirmation', { message: 'The passwords do not match' });
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
      <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography ml={2} variant="h4">
            Change Password
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
              label="New Password"
              type="password"
              name="password"
              rules={{ required: 'Required value' }}
            />
            <TextInput
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              rules={{ required: 'Required value' }}
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
                Change
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};
