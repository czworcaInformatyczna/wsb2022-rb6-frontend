import { useGetComponents } from 'features/components';
import { Box, Grid, Typography } from '@mui/material';
import { ComponentItem } from './ComponentItem';

interface IComponents {
  id: number;
  name: string;
}

export const Components = () => {
  const { data } = useGetComponents<IComponents[]>();

  return (
    <Grid alignItems="center" container direction="row" justifyContent="left">
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        <Typography ml={2} mt={2} variant="h4" color="primary.main">
          Component
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        <Box>
          {data?.map((component) => (
            <ComponentItem key={component.id} name={component.name} id={component.id} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
