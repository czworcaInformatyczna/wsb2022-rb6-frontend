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
  type IAssetFormInput,
  useGetModelOptions,
  useGetAssetsDataById,
  type IAsset,
  useAddAsset,
  Statuses,
  useUpdateAsset,
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
import { LoadingScreen } from 'components/Elements/Loading';
import { apiUrl, routePath } from 'routes';
import { AddModel } from 'features/model/components/AddModel';
import { CreateModal } from 'components/Elements/CreateModal';
import { StatusesList } from '../api/statuses';
import { getVariant } from 'utils';
import { useSnackbar } from 'notistack';

const AddAsset = () => {
  const methods = useForm<IAssetFormInput>();
  const { handleSubmit, setValue, reset, setError } = methods;
  const navigate = useNavigate();
  const statusOptions = StatusesList;
  const { data: modelOptions } = useGetModelOptions();
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const [loading, setLoading] = useState<boolean>(false);

  const { data: asset, refetch } = useGetAssetsDataById<IAsset>(
    Number(id),
    apiUrl.assetInfo + id,
    action === 'Add' ? false : true,
  );

  const { enqueueSnackbar } = useSnackbar();
  const addAsset = useAddAsset<FormData>(apiUrl.assets);
  const updateAsset = useUpdateAsset<FormData>();
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<Box />);

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setOpen(true);
  };

  const setValues = useCallback(
    (assetValues: any) => {
      setValue('AssetTag', assetValues.tag);
      setValue('Serial', assetValues.serial);
      const modelObject = modelOptions?.data?.find(
        (option) => option.id === assetValues.asset_model_id,
      );
      setValue('Model', modelObject !== undefined ? modelObject : null);
      const statusObject = statusOptions?.find((option) => option.id === assetValues.status);
      setValue('Status', statusObject !== undefined ? statusObject : null);
      setValue('Notes', assetValues.notes === null ? '' : assetValues.notes);
      setValue('AssetName', assetValues.name);
      setValue('Waranty', assetValues.warranty === null ? '' : assetValues.warranty);
      setValue('OrderNumber', assetValues.order_number === null ? '' : assetValues.order_number);
      setValue(
        'DateOfPurchase',
        assetValues.purchase_date === null ? '' : assetValues.purchase_date,
      );
      setValue('PurchaseCost', assetValues.price === null ? '' : assetValues.price);
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
        void refetch();
        setValues(asset);
        setLoading(false);
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [
    asset,
    id,
    isIdNotValid,
    location.pathname,
    navigate,
    refetch,
    reset,
    setValues,
    statusOptions,
  ]);

  const onSubmit = async (data: IAssetFormInput) => {
    const tempData = new FormData();
    tempData.append('name', data.AssetName);
    tempData.append('tag', data.AssetTag);
    tempData.append('asset_model_id', data.Model?.id ? data.Model.id.toString() : '');
    tempData.append('serial', data.Serial);
    tempData.append(
      'status',
      data.Status?.id || data.Status?.id === 0 ? data.Status.id.toString() : '',
    );
    tempData.append('notes', data.Notes);
    tempData.append('warranty', data.Waranty.toString());
    tempData.append(
      'purchase_date',
      data.DateOfPurchase !== '' ? new Date(data.DateOfPurchase).toISOString().split('T')[0] : '',
    );
    tempData.append('order_number', data.OrderNumber);
    tempData.append('price', data.PurchaseCost.toString());
    if (data.Photo instanceof File) tempData.append('image', data.Photo);
    console.log(data.Status);
    if (action === 'Add') {
      addAsset.mutate(tempData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('Asset has been added', { variant });
          reset();
        },
        onError(error) {
          console.log(error);
          const e: { message: string } = error.response?.data as { message: string };
          setError('AssetTag', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });
    }

    if (action === 'Edit') {
      if (id !== undefined)
        updateAsset.mutate(
          { id: id, body: tempData },
          {
            onSuccess: () => {
              const variant = getVariant('success');
              enqueueSnackbar('Asset has been edited', { variant });
              navigate(routePath.assets);
            },
            onError(error) {
              const e: { message: string } = error.response?.data as { message: string };
              setError('AssetTag', { type: 'server', message: e.message }, { shouldFocus: false });
            },
          },
        );
    }
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
          <CreateModal open={open} setOpen={setOpen} content={modalContent} />
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
                <TextInput
                  label="Asset Name"
                  name="AssetName"
                  rules={{ required: 'Required value' }}
                />
                <TextInput label="Serial" name="Serial" rules={{ required: 'Required value' }} />
                <SelectInput
                  label="Model"
                  name="Model"
                  containsImg
                  options={modelOptions?.data ? modelOptions.data : []}
                  modalContent={<AddModel isModal />}
                  openModal={openModal}
                />
                <SelectInput
                  label="Status"
                  name="Status"
                  options={
                    statusOptions
                      ? statusOptions.filter((status) => status.id !== Statuses.Deployed)
                      : []
                  }
                  modalContent={<div>Placeholder</div>}
                  openModal={openModal}
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
                        <DatePickerInput
                          label="Date Of Purchase"
                          name="DateOfPurchase"
                          disableFuture
                        />
                        <TextInput
                          endAdornment="€"
                          label="Purchase Cost"
                          name="PurchaseCost"
                          rules={{}}
                          type="number"
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
