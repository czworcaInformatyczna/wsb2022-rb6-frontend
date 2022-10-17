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
import { type IFormInput, useGetStatusOptions, getModelOptions } from 'features/assets';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  MultiLineTextInput,
  SelectInput,
  DatePickerInput,
  UploadImage,
  TextInput,
} from 'components/Elements/FormInputs';
import { useQuery } from 'react-query';
import { useCallback, useEffect, useState } from 'react';
import testData from '../api/testData.json';
import moment from 'moment';
import { LoadingScreen } from 'components/Elements/Loading';

const AddAsset = () => {
  const methods = useForm<IFormInput>();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const { data: statusOptions } = useGetStatusOptions();
  const { data: modelOptions } = useQuery('SelectModelOptions', getModelOptions);
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const [loading, setLoading] = useState<boolean>(false);

  const getDateFormat = (dateString: string) => {
    const dateMoment = moment(dateString, 'DD/MM/YYYY');
    return dateMoment.toDate().toString();
  };

  const setValues = useCallback(
    (asset: any) => {
      methods.setValue('AssetTag', asset.assetTag);
      methods.setValue('Serial', asset.serial);
      const modelObject = modelOptions?.find((x) => x.name === asset.model);
      methods.setValue('Model', modelObject !== undefined ? modelObject : null);
      const statusObject = statusOptions?.find((x) => x.name === asset.status);
      methods.setValue('Status', statusObject !== undefined ? statusObject : null);
      methods.setValue('Notes', asset.notes);
      methods.setValue('AssetName', asset.name);
      methods.setValue('Waranty', asset.waranty);
      methods.setValue('OrderNumber', asset.orderNumber);
      methods.setValue('DateOfPurchase', getDateFormat(asset.dateOfPurchase));
      methods.setValue('PurchaseCost', asset.purchaseCost);
    },
    [methods, modelOptions, statusOptions],
  );

  useEffect(() => {
    const isEdit = location.pathname.includes('EditAsset');
    if (isEdit && id === undefined) {
      navigate('/PageNotFound');
    }

    if (isEdit && id !== undefined) {
      setLoading(true);
      methods.reset();
      setAction('Edit');
      // TEST - REPLACE BY API CALL
      const asset = testData.find((x) => {
        if (x.id === Number(id)) return x;
      });
      if (asset !== undefined) {
        setValues(asset);
        setLoading(false);
      }
    }

    if (!isEdit) {
      methods.reset();
      setAction('Add');
    }
  }, [id, location.pathname, methods, navigate, setValues, statusOptions]);

  const onSubmit = (data: IFormInput) => {
    const tempData = { ...data };
    if (tempData.DateOfPurchase !== '')
      tempData.DateOfPurchase = new Date(tempData.DateOfPurchase).toISOString();
    console.log(tempData);
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
      {loading && <LoadingScreen displayText />}
      {!loading && (
        <Box>
          {' '}
          <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
            <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
              <Typography ml={2} variant="h4">
                {action} Asset
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
                <Button color="error" onClick={() => navigate(-1)} variant="contained">
                  Cancel
                </Button>
                <Button color="success" onClick={handleSubmit(onSubmit)} variant="contained">
                  {action}
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
                <TextInput
                  label="Asset Tag"
                  name="AssetTag"
                  rules={{ required: 'Required value' }}
                />
                <TextInput label="Serial" name="Serial" rules={{ required: 'Required value' }} />
                <SelectInput
                  label="Model"
                  name="Model"
                  containsImg
                  options={modelOptions ? modelOptions : []}
                />
                <SelectInput
                  label="Status"
                  name="Status"
                  options={statusOptions ? statusOptions : []}
                />
                <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                  <Accordion disableGutters>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      expandIcon={<ExpandMoreIcon />}
                      id="panel1a-header"
                      sx={{
                        backgroundColor: 'background.default',
                      }}
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
                        <UploadImage buttonText="Upload photo" name="Photo" accept="image/*" />
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
                      sx={{
                        backgroundColor: 'background.default',
                      }}
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
                        <UploadImage buttonText="Upload Receipt Image" name="Receipt" accept="*" />
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
                    <Button color="error" onClick={() => navigate(-1)} variant="contained">
                      Cancel
                    </Button>
                    <Button color="success" type="submit" variant="contained">
                      {action}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
};

export default AddAsset;
