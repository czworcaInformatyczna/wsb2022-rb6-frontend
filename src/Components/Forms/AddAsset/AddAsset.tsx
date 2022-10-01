import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import { type IFormInput } from './domain';
import { MultiLineTextInput } from './Inputs/MultiLineTextInput';
import { SelectModel } from './Inputs/SelectModel';
import { SelectStatus } from './Inputs/SelectStatus';
import { TextInput } from './Inputs/TextInput';
import { UploadImage } from './Inputs/UploadImage';

const AddAsset = () => {
  const {
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
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
            error={errors.AssetTag}
            label="Asset Tag"
            name="AssetTag"
            rules={{ required: 'Required value' }}
          />
          <TextInput
            control={control}
            error={errors.Serial}
            label="Serial"
            name="Serial"
            rules={{ required: 'Required value' }}
          />
          <SelectModel control={control} errors={errors} />
          <SelectStatus control={control} errors={errors} />
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header"
              >
                <Typography>Not required</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                <Grid alignContent="center" container display="flex" spacing={2}>
                  <MultiLineTextInput
                    control={control}
                    error={errors.Notes}
                    label="Notes"
                    name="Notes"
                    rows={4}
                    rules={{}}
                  />
                  <UploadImage name="Photo" register={register} setValue={setValue} />
                  <TextInput
                    control={control}
                    error={errors.AssetName}
                    label="Asset Name"
                    name="AssetName"
                    rules={{}}
                  />
                  <TextInput
                    control={control}
                    error={errors.Waranty}
                    helperText="No. of  Months"
                    label="Waranty"
                    name="Waranty"
                    rules={{ min: 0 }}
                    type="number"
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
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
