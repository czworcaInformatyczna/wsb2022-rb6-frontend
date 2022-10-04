import { type TextFieldProps } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { type FieldError, type Control, type FieldPath } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { type IFormInput } from '../domain';

export const DatePickerInput = ({
  error,
  helperText = '',
  control,
  label,
  name,
}: {
  control: Control<IFormInput>;
  error: FieldError | undefined;
  helperText?: string;
  label: string;
  name: FieldPath<IFormInput>;
}) => {
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
