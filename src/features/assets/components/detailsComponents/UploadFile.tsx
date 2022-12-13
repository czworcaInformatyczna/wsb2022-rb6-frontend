import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { UploadImage } from 'components/Elements/FormInputs';
import { useAddAsset } from 'features/assets/api';
import { type IUploadFile } from 'features/assets/types';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { apiUrl } from 'routes';
import { convertUrl, getVariant } from 'utils';

interface IProps {
  assetId: number;
  closeModal: () => void;
  type: 'Asset' | 'License';
}

const UploadFile = (props: IProps) => {
  const methods = useForm<any>();
  const { handleSubmit } = methods;
  const uploadFile = useAddAsset<FormData>(apiUrl.assetFiles);
  const uploadLicenseFile = useAddAsset<FormData>(
    convertUrl(apiUrl.licenseFile, { id: props.assetId }),
  );
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: IUploadFile) => {
    const formData = new FormData();
    if (props.type === 'Asset') {
      formData.append('file', data.file);
      formData.append('asset_id', props.assetId.toString());
      uploadFile.mutate(formData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('Asset file has been added', { variant });
          methods.reset();
          props.closeModal();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          methods.setError('file', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });
    }

    if (props.type === 'License') {
      formData.append('file', data.file);
      uploadLicenseFile.mutate(formData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('License File has been added', { variant });
          methods.reset();
          props.closeModal();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          methods.setError('file', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography ml={2} variant="h4">
            Upload file
          </Typography>
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
            <UploadImage buttonText="Upload file" name="file" accept="*" />
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
              <Button color="success" type="submit" variant="contained">
                Upload
              </Button>
            </Stack>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default UploadFile;
