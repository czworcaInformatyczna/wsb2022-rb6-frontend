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
import { useGetAssetsDataById } from 'features/assets';
import { type ILicense, type ILicenseFormInput } from 'features/licenses';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  MultiLineTextInput,
  SelectInput,
  DatePickerInput,
  TextInput,
} from 'components/Elements/FormInputs';

import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { LoadingScreen } from 'components/Elements/Loading';
import { apiUrl, routePath } from 'routes';
import { useGetCategoryOptions, useGetManufacturerOptions } from '../api';

const AddLicense = () => {
  const methods = useForm<ILicenseFormInput>();
  const { handleSubmit, setValue, reset } = methods;
  const navigate = useNavigate();
  const { data: categoryOptions } = useGetCategoryOptions();
  const { data: manufacturerOptions } = useGetManufacturerOptions();
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const [loading, setLoading] = useState<boolean>(false);
  const { data: license } = useGetAssetsDataById<ILicense>(Number(id), apiUrl.licenseInfoEdit);
  const getDateFormat = (dateString: string) => {
    const dateMoment = moment(dateString, 'DD/MM/YYYY');
    return dateMoment.toDate().toString();
  };

  const setValues = useCallback(
    (LicenseValues: any) => {
      setValue('Name', LicenseValues.name);
      setValue('Key', LicenseValues.key);
      const categoryObject = categoryOptions?.find(
        (option) => option.name === LicenseValues.category,
      );
      setValue('Category', categoryObject !== undefined ? categoryObject : null);
      const manufacturerObject = manufacturerOptions?.find(
        (option) => option.name === LicenseValues.manufacturer,
      );
      setValue('Manufacturer', manufacturerObject !== undefined ? manufacturerObject : null);
      setValue('Notes', LicenseValues.notes);
      setValue('OrderNumber', LicenseValues.order_number);
      setValue('DateOfPurchase', getDateFormat(LicenseValues.dateOfPurchase));
      setValue('ExpirationDate', getDateFormat(LicenseValues.expiration_date));
      setValue('PurchaseCost', LicenseValues.purchaseCost);
      setValue('LicensedTo', LicenseValues.licensed_to);
      setValue('Quantity', LicenseValues.quantity);
    },
    [categoryOptions, manufacturerOptions, setValue],
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );

  useEffect(() => {
    reset({
      Name: '',
      Key: '',
      Category: null,
      Manufacturer: null,
      Notes: '',
      OrderNumber: '',
      ExpirationDate: '',
      DateOfPurchase: '',
      PurchaseCost: '',
      LicensedTo: '',
      Quantity: '',
    });
    const isEdit = location.pathname.includes('EditLicense');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setLoading(true);
      setAction('Edit');
      if (license !== undefined) {
        setValues(license);
        setLoading(false);
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [license, id, isIdNotValid, location.pathname, navigate, reset, setValues]);

  const onSubmit = (data: ILicenseFormInput) => {
    const tempData = { ...data };
    if (tempData.DateOfPurchase !== '')
      tempData.DateOfPurchase = new Date(tempData.DateOfPurchase).toISOString();
    if (tempData.ExpirationDate !== '')
      tempData.ExpirationDate = new Date(tempData.ExpirationDate).toISOString();
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
                {action} License
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
                <TextInput label="Name" name="Name" rules={{ required: 'Required value' }} />
                <TextInput label="Key" name="Key" rules={{ required: 'Required value' }} />
                <SelectInput
                  label="Category"
                  name="Category"
                  options={categoryOptions ? categoryOptions : []}
                />
                <TextInput
                  label="Quantity"
                  name="Quantity"
                  rules={{ min: 1, required: 'Required value' }}
                  type="number"
                />

                <SelectInput
                  label="Manufacturer"
                  name="Manufacturer"
                  options={manufacturerOptions ? manufacturerOptions : []}
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
                        <DatePickerInput
                          label="Expiration Date"
                          name="ExpirationDate"
                          disablePast
                        />
                        <TextInput label="Licensed to" name="LicensedTo" rules={{}} />
                        <DatePickerInput
                          label="Date Of Purchase"
                          name="DateOfPurchase"
                          disableFuture
                        />
                        <TextInput
                          label="Order number"
                          name="OrderNumber"
                          rules={{ required: 'Required value' }}
                        />
                        <TextInput
                          endAdornment="€"
                          label="Purchase Cost"
                          name="PurchaseCost"
                          rules={{}}
                          type="number"
                        />
                        <MultiLineTextInput label="Notes" name="Notes" rows={4} />
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

export default AddLicense;
