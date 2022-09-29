import { Box, Button, Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';

import { useForm } from 'react-hook-form';
import { type IFormInput } from './domain';
import { MultiLineTextInput } from './MultiLineTextInput';
import { SelectModel } from './SelectModel';
import { SelectStatus } from './SelectStatus';
import { TextInput } from './TextInput';
import { UploadImage } from './UploadImage';

const AddAsset = () => {
  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  const testFunction = () => {
    const x = getValues('photo');
    console.log(x);
  };

  return (
    <Box
      alignSelf="center"
      sx={{
        width: { lg: '60%', xs: '100%' },
        flexGrow: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography ml={2} variant="h4">
            Add Asset
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
        }}
      >
        <Grid alignContent="center" container display="flex" item mt={2} spacing={2}>
          <TextInput
            control={control}
            errors={errors}
            label="Asset Tag"
            name="AssetTag"
            rules={{ required: 'Required value' }}
          />
          <TextInput
            control={control}
            errors={errors}
            label="Serial"
            name="Serial"
            rules={{ required: 'Required value' }}
          />
          <SelectModel control={control} errors={errors} />
          <SelectStatus control={control} errors={errors} />
          <MultiLineTextInput
            control={control}
            errors={errors}
            label="Notes"
            name="Notes"
            rows={4}
            rules={{}}
          />
          <UploadImage
            control={control}
            errors={errors}
            name="photo"
            register={register}
            setValue={setValue}
          />
          <Button onClick={testFunction}>asdasd</Button>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Button color="success" type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddAsset;
