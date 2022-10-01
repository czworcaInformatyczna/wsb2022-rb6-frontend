import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { type FieldErrorsImpl, type Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CreateModal } from './CreateModal';
import { type IStatus } from '../domain';
import { type IFormInput } from '../domain';

export const SelectStatus = ({
  control,
  errors,
}: {
  control: Control<IFormInput>;
  errors: FieldErrorsImpl<IFormInput>;
}) => {
  const [statusData, setStatusData] = React.useState<IStatus[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setStatusData([
      {
        id: '1',
        name: 'Ready to deploy',
      },
      {
        id: '2',
        name: 'Maintance',
      },
    ]);
  }, []);

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
          defaultValue={null}
          name="Status"
          render={({ field }) => (
            <Autocomplete
              {...field}
              autoHighlight
              fullWidth
              getOptionLabel={(option) => (option.name ? option.name : '')}
              id="country-select-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => field.onChange(data)}
              options={statusData}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errors.Status)}
                  fullWidth
                  helperText={errors.Status ? errors.Status.message?.toString() : ''}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  label="Select status"
                  size="small"
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.name}
                </Box>
              )}
            />
          )}
          rules={{
            required: 'Required value',
          }}
        />
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          variant="contained"
        >
          Create
        </Button>
      </Grid>
      <CreateModal open={open} setOpen={setOpen} />
    </Grid>
  );
};
