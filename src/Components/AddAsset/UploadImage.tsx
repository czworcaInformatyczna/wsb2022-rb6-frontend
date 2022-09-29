/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import {
  type UseFormSetValue,
  type Control,
  type FieldPath,
  type FieldErrorsImpl,
  type UseFormRegister,
} from 'react-hook-form';
import { type IFormInput } from './domain';

export const UploadImage = ({
  control,
  name,
  setValue,
  errors,
  register,
}: {
  control: Control<IFormInput>;
  errors: FieldErrorsImpl<IFormInput>;
  name: FieldPath<IFormInput>;
  register: UseFormRegister<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
}) => {
  const [img, setImg] = React.useState<string>();

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
        <Box>
          <Button component="label" variant="contained">
            Upload photo
            <input
              {...register('photo')}
              accept="image/*"
              hidden
              onChange={(e) => {
                const files = e.target.files;
                if (files !== null) {
                  setImg(URL.createObjectURL(files[0]));
                  setValue('photo', files[0]);
                }
              }}
              type="file"
            />
          </Button>
          <Typography color="error">
            {}
            {errors.photo ? 'Photo is required' : ''}
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <p />
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <p />
      </Grid>
      <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
        <img alt="" src={img} width="200px" />
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <p />
      </Grid>
    </Grid>
  );
};
