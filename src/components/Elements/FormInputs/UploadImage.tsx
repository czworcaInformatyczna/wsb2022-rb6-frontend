import { Box, Button, Grid, Typography } from '@mui/material';
import { type IAssetFormInput } from 'features/assets';
import { useState } from 'react';
import { type FieldPath, useFormContext } from 'react-hook-form';

export interface IUploadImage {
  accept: string;
  buttonText: string;
  name: FieldPath<IAssetFormInput>;
}
export const UploadImage = ({ name, buttonText, accept }: IUploadImage) => {
  const [img, setImg] = useState<string | null>();
  const [fileName, setFileName] = useState<string>('');

  const { register, setValue, getValues } = useFormContext();

  const val = getValues(name);
  if (val instanceof FileList && img) {
    setFileName('');
    setImg(null);
  }

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
            {buttonText}
            <input
              {...register(name)}
              accept={accept}
              hidden
              onChange={(e) => {
                const files = e.target.files;
                if (files !== null) {
                  setFileName(files[0].name);
                  setImg(URL.createObjectURL(files[0]));
                  setValue(name, files[0]);
                }
              }}
              type="file"
            />
          </Button>

          {fileName.length > 0 && <Typography color="success.main">✓ {fileName}</Typography>}
        </Box>
      </Grid>
      <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
        <p />
      </Grid>
      {img && (
        <>
          <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
            <p />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
            <img alt="" src={img} width="200px" />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xl={3} xs={3}>
            <p />
          </Grid>
        </>
      )}
    </Grid>
  );
};
