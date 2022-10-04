import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { type FieldErrorsImpl, type Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CreateModal } from '../CreateModal';
import { type IModel } from '../domain';
import { type IFormInput } from '../domain';

export const SelectModel = ({
  control,
  errors,
}: {
  control: Control<IFormInput>;
  errors: FieldErrorsImpl<IFormInput>;
}) => {
  const [modelsData, setModelsData] = React.useState<IModel[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setModelsData([
      {
        id: '1',
        name: 'laptop',
        img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
      },
      {
        id: '2',
        name: 'zmywarki',
        img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
      },
      {
        id: '3',
        name: 'wiertarka',
        img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
      },
      {
        id: '0',
        name: 'złom',
        img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWWkOk?ver=01fe&q=90&m=6&h=454&w=808&b=%23FFFFFFFF&l=f&o=t&aim=true',
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
          name="Model"
          render={({ field }) => (
            <Autocomplete
              {...field}
              autoHighlight
              fullWidth
              getOptionLabel={(option) => (option.name ? option.name : '')}
              id="selet-Model"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => field.onChange(data)}
              options={modelsData}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errors.Model)}
                  fullWidth
                  helperText={errors.Model ? errors.Model.message?.toString() : ''}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  label="Select a model"
                  size="small"
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img alt="" loading="lazy" src={option.img} width="20" />
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
