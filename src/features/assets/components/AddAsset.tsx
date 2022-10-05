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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormProvider, useForm } from 'react-hook-form';
import { type IFormInput } from 'features/assets';
import { useNavigate } from 'react-router-dom';
import {
  MultiLineTextInput,
  SelectInput,
  DatePickerInput,
  UploadImage,
  TextInput,
} from 'components/Elements/FormInputs';

const AddAsset = () => {
  const methods = useForm<IFormInput>();
  const { handleSubmit } = methods;

  const navigate = useNavigate();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  const statusOptions = [
    {
      id: '1',
      name: 'Ready to deploy',
    },
    {
      id: '2',
      name: 'Maintance',
    },
  ];

  const modelOptions = [
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
  ];

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
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: '100%',
          }}
        >
          <Grid alignContent="center" container display="flex" item mt={2} spacing={2}>
            <TextInput label="Asset Tag" name="AssetTag" rules={{ required: 'Required value' }} />
            <TextInput label="Serial" name="Serial" rules={{ required: 'Required value' }} />
            <SelectInput label="Model" name="Model" containsImg options={modelOptions} />
            <SelectInput label="Status" name="Status" options={statusOptions} />
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
                    <MultiLineTextInput label="Notes" name="Notes" rows={4} />
                    <UploadImage<IFormInput> buttonText="Upload photo" name="Photo" />
                    <TextInput label="Asset Name" name="AssetName" rules={{}} />
                    <TextInput
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
                    <TextInput label="Order Number" name="OrderNumber" rules={{}} />
                    <DatePickerInput label="Date Of Purchase" name="DateOfPurchase" />
                    <TextInput
                      endAdornment="€"
                      label="Purchase Cost"
                      name="PurchaseCost"
                      rules={{}}
                      type="number"
                    />
                    <UploadImage buttonText="Upload Receipt Image" name="Receipt" />
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
      </FormProvider>
    </Box>
  );
};

export default AddAsset;
