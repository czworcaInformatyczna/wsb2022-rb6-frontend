import { type TextFieldProps } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { type IInputProps } from 'features/assets';

export const DatePickerInput = ({ helperText = '', label, name }: IInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  return (
    <Grid alignContent="center" container display="flex" item spacing={2}>
      <Grid
        alignContent="center"
        display="flex"
        item
        justifyContent="flex-end"
        lg={3}
        md={3}
        sm={3}
        xl={3}
        xs={3}
      >
        <p />
      </Grid>
      <Grid alignContent="center" display="flex" item lg={6} md={6} sm={6} xl={6} xs={6}>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <DatePicker
              {...field}
              disableFuture
              label={label}
              openTo="year"
              inputFormat="dd.MM.yyyy"
              renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                <TextField
                  {...params}
                  error={Boolean(error)}
                  helperText={error ? error.message?.toString() : helperText}
                  size="small"
                />
              )}
              views={['year', 'month', 'day']}
            />
          )}
        />
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <p />
      </Grid>
    </Grid>
  );
};
