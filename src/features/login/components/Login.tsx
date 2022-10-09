import { TextField, Button, Box } from '@mui/material';
import { useState, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from 'providers/AuthProvider';
import { type ILogin } from 'features/login/types';
import { getErrorMessage } from 'utils/getErrorMessage';

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
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        padding: '1rem',
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '15rem',
      }}
    >
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
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ marginTop: '5%', marginLeft: '50%', color: 'white' }}
              disabled={loading}
            >
              Log in
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
};
