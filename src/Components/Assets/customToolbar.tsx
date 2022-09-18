import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridPagination,
} from '@mui/x-data-grid';
import React from 'react';
import { CustomToolbarProps } from './domain';

export const CustomToolbar = (Props: CustomToolbarProps) => {
  const [action, setAction] = React.useState<string>('');

  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" alignItems="left" justifyContent="flex-start" flexDirection="column">
        <GridToolbarQuickFilter />
        <Box display="flex" alignItems="center" justifyContent="flex-start" flexDirection="row">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-label">Action</InputLabel>

            <Select
              labelId="select-label"
              id="action-select"
              value={action}
              label="Action"
              onChange={(event: SelectChangeEvent) => {
                setAction(event.target.value);
              }}
            >
              <MenuItem value={'Clone'}>Clone</MenuItem>
              <MenuItem value={'Edit'}>Edit</MenuItem>
              <MenuItem value={'Generate Label'}>Generate Label</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            disabled={(action === '' ? true : false) || Props.selectedItems.length === 0}
            onClick={() => {
              alert('clicked');
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
      <Box>
        <GridPagination />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector sx={{ justifySelf: 'flex-end' }} />
        <GridToolbarExport sx={{ justifySelf: 'flex-end' }} />
      </Box>
    </GridToolbarContainer>
  );
};
