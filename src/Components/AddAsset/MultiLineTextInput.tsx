import { Grid, TextField } from '@mui/material';
import React from 'react';
import {
  type Control,
  type FieldPath,
  type RegisterOptions,
  type FieldError,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { type IFormInput } from './domain';

export const MultiLineTextInput = ({
  control,
  error,
  label,
  name,
  rows,
  rules,
}: {
  control: Control<IFormInput>;
  error: FieldError | undefined;
  label: string;
  name: FieldPath<IFormInput>;
  rows: number;
  rules: Exclude<RegisterOptions, 'setValueAs' | 'valueAsDate' | 'valueAsNumber'>;
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
          rules={rules}
        />
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <p />
      </Grid>
    </Grid>
  );
};
