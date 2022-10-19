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
import {
  type IFormInput,
  useGetStatusOptions,
  useGetModelOptions,
  useGetAssetDetailsEdit,
} from 'features/assets';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  MultiLineTextInput,
  SelectInput,
  DatePickerInput,
  UploadImage,
  TextInput,
} from 'components/Elements/FormInputs';

import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { LoadingScreen } from 'components/Elements/Loading';
import { routePath } from 'routes';

const AddAsset = () => {
  const methods = useForm<IFormInput>();
  const { handleSubmit, setValue, reset } = methods;
  const navigate = useNavigate();
  const { data: statusOptions } = useGetStatusOptions();
  const { data: modelOptions } = useGetModelOptions();
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const [loading, setLoading] = useState<boolean>(false);
  const { data: asset } = useGetAssetDetailsEdit(Number(id));
  const getDateFormat = (dateString: string) => {
    const dateMoment = moment(dateString, 'DD/MM/YYYY');
    return dateMoment.toDate().toString();
  };

  const setValues = useCallback(
    (assetValues: any) => {
      setValue('AssetTag', assetValues.assetTag);
      setValue('Serial', assetValues.serial);
      const modelObject = modelOptions?.find((option) => option.name === assetValues.model);
      setValue('Model', modelObject !== undefined ? modelObject : null);
      const statusObject = statusOptions?.find((option) => option.name === assetValues.status);
      setValue('Status', statusObject !== undefined ? statusObject : null);
      setValue('Notes', assetValues.notes);
      setValue('AssetName', assetValues.name);
      setValue('Waranty', assetValues.waranty);
      setValue('OrderNumber', assetValues.orderNumber);
      setValue('DateOfPurchase', getDateFormat(assetValues.dateOfPurchase));
      setValue('PurchaseCost', assetValues.purchaseCost);
    },
    [modelOptions, setValue, statusOptions],
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );

  useEffect(() => {
    reset({
      AssetTag: '',
      Serial: '',
      Model: null,
      Status: null,
      Notes: '',
      AssetName: '',
      Waranty: '',
      OrderNumber: '',
      DateOfPurchase: '',
      PurchaseCost: '',
    });
    const isEdit = location.pathname.includes('EditAsset');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setLoading(true);
      setAction('Edit');
      if (asset !== undefined) {
        setValues(asset);
        setLoading(false);
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [asset, id, isIdNotValid, location.pathname, navigate, reset, setValues, statusOptions]);

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
