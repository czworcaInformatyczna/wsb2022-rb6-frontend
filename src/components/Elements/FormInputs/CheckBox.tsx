import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { type RegisterOptions, useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { type IInputProps } from 'features/assets';

export interface ITextInput extends IInputProps {
  endAdornment?: string;
  helperText?: string;
  rules: Exclude<RegisterOptions, 'setValueAs' | 'valueAsDate' | 'valueAsNumber'>;
}

export const CheckBox = ({ label, name, rules }: ITextInput) => {
  const { control } = useFormContext();

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
            <FormControlLabel control={<Checkbox {...field} />} label={label} />
          )}
          rules={rules}
        />
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <p />
      </Grid>
    </Grid>
  );
};
