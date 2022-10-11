import { TextField, Box } from '@mui/material';
import { useState, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from 'providers/AuthProvider';
import { type ILogin } from 'features/login/types';
import { getErrorMessage } from 'utils/getErrorMessage';
import { BackgroundContainer, LoginBox, ActionButton } from 'features/login';

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
    <BackgroundContainer>
      <LoginBox>
        <Box sx={{ marginTop: '15%' }}>
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
                    sx={{ marginTop: '5%' }}
                  />
                )}
              />
            </div>
            <div>
              <ActionButton variant="contained" type="submit" color="primary" disabled={loading}>
                Log in
              </ActionButton>
            </div>
          </form>
        </Box>
      </LoginBox>
    </BackgroundContainer>
  );
};
