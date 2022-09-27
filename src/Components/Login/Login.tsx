import { TextField, Button, Box } from '@mui/material';
import { type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';
import { useTodosQuery } from '../../shared/hooks/useTokenQuery';
export interface ILogin {
  email: string;
  password: string;
}

export const Login: FC = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    getValues,
  } = useForm<ILogin>();
  const formValues = getValues();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { data: resp, refetch } = useTodosQuery(formValues);

  const onSubmit = async (userData: ILogin) => {
    const { email } = userData;
    await refetch();
    // const getTokenApiData = await apiService.getToken({ email, password });
    const getTokenApiData = resp?.data;
    const token: string = getTokenApiData?.data.access_token;

    if (token) {
      setAuth({ email, token });
      navigate('/dashboard', { replace: true });
      console.log(token);
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
                />
              )}
            />
          </div>
          <div>
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ marginTop: '5%', marginLeft: '50%' }}
            >
              Zaloguj
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
};
