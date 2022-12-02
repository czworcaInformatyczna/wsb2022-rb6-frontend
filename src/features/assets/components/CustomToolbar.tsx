import { type CustomToolbarProps } from 'features/assets';
import { type SelectChangeEvent } from '@mui/material';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  // GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridPagination,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { getVariant } from 'utils';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const CustomToolbar = (Props: CustomToolbarProps) => {
  const [action, setAction] = useState<string>('');
  const deleteAsset = Props.deleteHook();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if (action === 'Delete')
      Props.selectedItems.map((item) =>
        deleteAsset.mutate(item, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Elements has been deleted', { variant });
            Props.resetSelection();
          },
        }),
      );
    if (action === 'Generate Label') {
      Props.handleModal(Props.selectedItems);
    }
  };

  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box alignItems="left" display="flex" flexDirection="column" justifyContent="flex-start">
        <GridToolbarQuickFilter />
        <Box alignItems="center" display="flex" flexDirection="row" justifyContent="flex-start">
          <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
            <InputLabel id="select-label">Action</InputLabel>

            <Select
              id="action-select"
              label="Action"
              labelId="select-label"
              onChange={(event: SelectChangeEvent) => {
                setAction(event.target.value);
              }}
              value={action}
            >
              <MenuItem value="Delete">Delete</MenuItem>
              {Props.name === 'Assets' && (
                <MenuItem value="Generate Label">Generate Label</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button
            size="large"
            disabled={(action === '' ? true : false) || Props.selectedItems.length === 0}
            onClick={handleClick}
            variant="contained"
          >
            Apply
          </Button>
        </Box>
      </Box>
      <Box>
        <GridPagination />
        <GridToolbarColumnsButton />
        {/* <GridToolbarFilterButton /> */}
        <GridToolbarDensitySelector sx={{ justifySelf: 'flex-end' }} />
        <Button
          onClick={Props.handleExport}
          sx={{ justifySelf: 'flex-end' }}
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
      </Box>
    </GridToolbarContainer>
  );
};
