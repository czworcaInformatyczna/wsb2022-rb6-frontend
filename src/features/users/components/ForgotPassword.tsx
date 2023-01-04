import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { TextInput } from 'components/Elements/FormInputs';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getVariant } from 'utils';
import { useForgotPassword } from '../api';

export const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<{ email: string }>();
  const { handleSubmit, setError, reset } = methods;
  const resetPassword = useForgotPassword<{ email: string }>();
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string }) => {
    resetPassword.mutate(data, {
      onSuccess: () => {
        const variant = getVariant('success');
        enqueueSnackbar('Message has been sent on your email', { variant });
        reset();
        navigate(-1);
      },
      onError(error) {
        const e: { message: string } = error.response?.data as { message: string };
        setError('email', { type: 'server', message: e.message }, { shouldFocus: false });
      },
    });
  };

  return (
    <Box
      alignSelf="center"
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          borderRadius: 1,
        }}
      >
        <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Typography ml={2} variant="h4">
              Reset Password
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
                  Reset password
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};
