import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Stack,
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
import { useNavigate } from 'react-router-dom';
import { DatePickerInput } from './Inputs/DatePicker';

const AddAsset = () => {
  const {
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const navigate = useNavigate();

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
        <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
          <Typography ml={2} variant="h4">
            Add Asset
          </Typography>
        </Grid>
        <Grid
          alignContent="center"
          display="flex"
          item
          justifyContent="flex-end"
          lg={6}
          md={6}
          sm={6}
          xl={6}
          xs={6}
        >
          <Stack direction="row" mb={1} mr={2} spacing={1}>
            <Button color="error" onClick={() => navigate(-1)} variant="outlined">
              Cancel
            </Button>
            <Button color="success" onClick={handleSubmit(onSubmit)} variant="contained">
              Add
            </Button>
          </Stack>
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
            <Accordion disableGutters>
              <AccordionSummary
                aria-controls="panel1a-content"
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header"
              >
                <Typography>Additional informations</Typography>
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
                  <UploadImage
                    buttonText="Upload photo"
                    name="Photo"
                    register={register}
                    setValue={setValue}
                  />
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
            <Accordion disableGutters>
              <AccordionSummary
                aria-controls="panel1a-content"
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header"
              >
                <Typography>Order information</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                <Grid alignContent="center" container display="flex" spacing={2}>
                  <TextInput
                    control={control}
                    error={errors.OrderNumber}
                    label="Order Number"
                    name="OrderNumber"
                    rules={{}}
                  />
                  <DatePickerInput
                    control={control}
                    error={errors.DateOfPurchase}
                    label="Date Of Purchase"
                    name="DateOfPurchase"
                  />
                  <TextInput
                    control={control}
                    endAdornment="€"
                    error={errors.PurchaseCost}
                    label="Purchase Cost"
                    name="PurchaseCost"
                    rules={{}}
                    type="number"
                  />
                  <UploadImage
                    buttonText="Upload Receipt Image"
                    name="Receipt"
                    register={register}
                    setValue={setValue}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid
            alignContent="center"
            display="flex"
            item
            justifyContent="flex-end"
            lg={12}
            mb={2}
            md={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Stack direction="row" mr={2} spacing={1}>
              <Button color="error" onClick={() => navigate(-1)} variant="outlined">
                Cancel
              </Button>
              <Button color="success" type="submit" variant="contained">
                Add
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddAsset;
