import { TextField, Box, Grid } from '@mui/material';
import { useState, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from 'providers/AuthProvider';
import { type ILogin } from 'features/login/types';
import { getErrorMessage } from 'utils/getErrorMessage';
import { BackgroundContainer, LoginBox, ActionButton, focusColors } from 'features/login';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { routePath } from 'routes';

export const Login: FC = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ILogin>();
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();

  const onSubmit = async (userData: ILogin) => {
    try {
      await handleLogin(userData, setLoading);
    } catch (error) {
      setError('email', { type: 'focus' }, { shouldFocus: true });
      setError(
        'password',
        { type: 'focus', message: getErrorMessage(error) },
        { shouldFocus: true },
      );
      setLoading(false);
    }
  };

  return (
    <Grid
      alignItems="center"
      container
      direction="row"
      justifyContent="center"
      spacing={0}
      sx={{ minWidth: '100%', height: '100vh' }}
    >
      <Grid item lg={9} md={7} sm={6} xl={9} xs={12}>
        <BackgroundContainer>
          <Box pt={5}>
            <Typography
              color="grey[500]"
              sx={{
                textShadow: ' -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
                typography: { xs: 'h3', md: 'h1' },
              }}
            >
              InvenMan
            </Typography>
            <Typography
              sx={{
                textShadow: ' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                typography: { xs: 'h5', md: 'h4' },
              }}
            >
              Makes asset managment easier!
            </Typography>
          </Box>
        </BackgroundContainer>
      </Grid>
      <Grid item lg={3} md={5} sm={6} xl={3} xs={12}>
        <LoginBox>
          <Box pb={20}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  control={control}
                  defaultValue=""
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Wrong email format',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={Boolean(errors.email)}
                      helperText={errors.email ? errors.email.message : ''}
                      label="Email"
                      size="small"
                      variant="outlined"
                      sx={focusColors}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  defaultValue=""
                  name="password"
                  rules={{
                    required: 'Password is required',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={Boolean(errors.password)}
                      helperText={errors.email ? errors?.password?.message : ''}
                      label="Password"
                      size="small"
                      variant="outlined"
                      type="password"
                      sx={{ marginTop: '5%', ...focusColors }}
                    />
                  )}
                />
              </div>
              <div>
                <Typography pt={1}>
                  <Box
                    component={Link}
                    to={routePath.resetPassword}
                    sx={{
                      color: 'gray',
                    }}
                  >
                    Forgot password?
                  </Box>
                </Typography>
                <ActionButton variant="contained" type="submit" color="primary" disabled={loading}>
                  Log in
                </ActionButton>
              </div>
            </form>
          </Box>
        </LoginBox>
      </Grid>
    </Grid>
  );
};
