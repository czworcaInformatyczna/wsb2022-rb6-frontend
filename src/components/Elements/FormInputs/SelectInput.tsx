import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { type IInputProps } from 'features/assets';

export interface ISelectInput extends IInputProps {
  containsImg?: boolean;
  createButton?: boolean;
  modalContent?: JSX.Element;
  openModal?: (content: JSX.Element) => void;
  options: any[];
}

export const SelectInput = ({
  createButton = true,
  name,
  label,
  containsImg,
  options,
  modalContent,
  openModal,
}: ISelectInput) => {
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
          defaultValue={null}
          name={name}
          render={({ field }) => (
            <Autocomplete
              {...field}
              autoHighlight
              fullWidth
              getOptionLabel={(option) => (option.name ? option.name : '')}
              id={`select-${name}`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => field.onChange(data)}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(error)}
                  fullWidth
                  helperText={error ? error.message?.toString() : ''}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  label={label}
                  size="small"
                />
              )}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                  key={option.id}
                >
                  {containsImg && <img alt="" loading="lazy" src={option.img} width="20" />}
                  {option.email ? option.email : option.name}
                </Box>
              )}
            />
          )}
          rules={{
            required: 'Required value',
          }}
        />
      </Grid>
      <Grid
        item
        lg={3}
        md={3}
        sm={3}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'start' },
        }}
        xl={3}
        xs={12}
      >
        {createButton && (
          <Button
            sx={{
              maxHeight: '40px',
            }}
            onClick={() => {
              if (openModal !== undefined) openModal(modalContent ? modalContent : <div />);
            }}
            variant="contained"
          >
            Create
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
