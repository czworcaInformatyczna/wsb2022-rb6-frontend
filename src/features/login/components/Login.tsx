import { TextField, Button, Box } from '@mui/material';
import { useState, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'features/login/api/getToken';
import { useAuth } from 'hooks/useAuth';
import { type ILogin } from 'features/login/types';
import Cookies from 'js-cookie';

export const tokenCookie = 'inven_app_token';
export const emailCookie = 'inven_app_email';

export const Login: FC = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ILogin>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  const onSubmit = async (userData: ILogin) => {
    const { email, password } = userData;
    setLoading(true);
    const response = await getToken({ email, password });
    const token: string = response?.data.access_token;

    if (token) {
      Cookies.set(tokenCookie, token);
      Cookies.set(emailCookie, email);
      setAuth({ email, token });
      navigate('/dashboard');
    } else {
      setError(
        'email',
        { type: 'focus', message: 'Niepoprawny email lub hasło' },
        { shouldFocus: true },
      );
      setError('password', { type: 'focus' }, { shouldFocus: true });
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
                required: 'Uzupełnij email',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Podaj poprawny email',
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
                  label="Hasło"
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
              Zaloguj
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
};
