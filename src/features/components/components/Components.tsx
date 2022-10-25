import { useGetComponents, useAddComponent } from 'features/components';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ComponentItem } from './ComponentItem';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';

export interface IComponents {
  id?: string;
  name: string;
}

export const Components = () => {
  const { data } = useGetComponents<IComponents[]>();
  const { register, handleSubmit } = useForm<IComponents>();
  const addComponent = useAddComponent<IComponents>();

  const onSubmit = ({ name }: IComponents) => {
    addComponent.mutate({ name });
  };

  return (
    <Grid rowSpacing={1} alignItems="center" container direction="row" justifyContent="left">
      <Grid item>
        <Typography ml={2} mt={2} variant="h4" color="primary.main">
          Component
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        {data?.map((component) => (
          <ComponentItem key={component.id} name={component.name} id={component.id} />
        ))}
      </Grid>
      <Grid item sx={{ mt: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mb: 1 }}>
            <TextField
              {...register('name')}
              type="text"
              label="comp"
              size="small"
              variant="outlined"
            />
            <Button sx={{ ml: 1 }} color="success" variant="contained" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Grid>

      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        {data?.map((component) => (
          <h2 key={component.id}>{component.name}</h2>
        ))}
      </Grid>
    </Grid>
  );
};
