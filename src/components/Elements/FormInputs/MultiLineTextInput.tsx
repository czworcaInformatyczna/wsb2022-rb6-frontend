import { Grid, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { type IInputProps } from 'features/assets';

export interface IMultiLineTextInput extends IInputProps {
  rows: number;
}

export const MultiLineTextInput = ({ label, name, rows }: IMultiLineTextInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { [name]: error } = errors;
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
            <TextField
              {...field}
              error={Boolean(error)}
              fullWidth
              helperText={error ? error.message?.toString() : ''}
              label={label}
              multiline
              rows={rows}
              size="small"
              variant="outlined"
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
