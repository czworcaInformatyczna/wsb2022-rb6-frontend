import { TextField, Button, Box } from '@mui/material';
import { type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import apiService from '../../shared/api/apiService';

interface ILogin {
  email: string;
  password: string;
}

export const Login: FC = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ILogin>();

  const onSubmit = async ({ email, password }: ILogin) => {
    console.log({ email, password });
    const getTokenApi = await apiService.getToken();
    console.log(getTokenApi?.data.access_token);
    setError(
      'email',
      { type: 'focus', message: 'Niepoprawny email lub hasło' },
      { shouldFocus: true },
    );
    setError('password', { type: 'focus' }, { shouldFocus: true });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '30rem',
      }}
    >
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
                label="Password"
                size="small"
                variant="outlined"
                type="password"
              />
            )}
          />
        </div>
        <div>
          <Button variant="contained" type="submit" color="success">
            Save
          </Button>
        </div>
      </form>
    </Box>
  );
};
