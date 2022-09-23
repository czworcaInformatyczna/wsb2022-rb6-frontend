import { Box, Button, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { type Asset, type ContextMenu } from './domain';
import { type AssetsProps } from './domain';
import { type GridColumns } from '@mui/x-data-grid';
import {
  type GridCallbackDetails,
  type GridFilterModel,
  type GridRowParams,
  type GridSelectionModel,
  type GridSortModel,
} from '@mui/x-data-grid';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import testData from './testData.json';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { CustomToolbar } from './customToolbar';
const Assets = (Props: AssetsProps) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [assets, setAssets] = React.useState<Asset[]>([]);
  const [loadingData, setLoadingData] = React.useState<boolean>(true);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [rowCountState, setRowCountState] = React.useState<number>(0);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [contextMenu, setContextMenu] = React.useState<ContextMenu | null>(null);

  React.useEffect(() => {
    setAssets(testData);
    setRowCountState(testData.length);
    setLoading(false);
    setLoadingData(false);
  }, []);

  const handlePageSizeChange = (newPageSize: number) => {
    // API CALL GET DATA

    setPageSize(newPageSize);
  };

  const handlePageChange = (newPage: number) => {
    // API CALL GET NEW PAGE DATA
    console.log(newPage);
  };

  const handleSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
    console.log(JSON.stringify(model) + '  =====   ' + JSON.stringify(details)); // API CALL HERE
  };

  const handleSelectionModelChange = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const handleFilterChange = (filterModel: GridFilterModel) => {
    // Here you save the data you need from the filter model
    console.log(filterModel);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(Number(event.currentTarget.getAttribute('data-id')));

    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      elementId: Number(event.currentTarget.getAttribute('data-id')),
    });
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const actions: GridColumns = [
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Clone">
              <Box>
                <ContentCopyIcon sx={{ color: 'info.main' }} />{' '}
              </Box>
            </Tooltip>
          }
          key={params.id}
          label="Clone"
          onClick={() => {
            console.log(params.id);
          }}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit">
              <Box>
                <EditIcon sx={{ color: 'warning.main' }} />{' '}
              </Box>
            </Tooltip>
          }
          key={params.id}
          label="Edit"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <Box>
                <DeleteForeverIcon sx={{ color: 'error.main' }} />
              </Box>
            </Tooltip>
          }
          key={params.id}
          label="Delete"
          onClick={() => {}}
        />,
      ],
      width: 150,
    },
  ];
  const columnsWithAction: GridColumns = [...Props.data.columns, ...actions];

  return (
    <Box>
      {loading && <Box>Loading</Box>}
      {!loading && (
        <Grid
          alignItems="center"
          container
          direction="row"
          justifyContent="center"
          pt={2}
          spacing={0}
          sx={{ minHeight: '75px' }}
        >
          <Grid item lg={9} md={9} sm={6} xl={9} xs={6}>
            <Typography ml={2} variant="h4">
              {Props.data.name}
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
            <Box display="flex" justifyContent="end" mr={2}>
              <Button color="success" size="medium" variant="outlined">
                Add new
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              autoHeight
              checkboxSelection
              columns={columnsWithAction}
              components={{
                Toolbar: CustomToolbar,
              }}
              componentsProps={{
                row: {
                  onContextMenu: handleContextMenu,
                  style: { cursor: 'context-menu' },
                },
                toolbar: {
                  selectedItems: selectionModel,
                },
              }}
              disableColumnMenu
              disableSelectionOnClick
              filterMode="server"
              keepNonExistentRowsSelected
              loading={loadingData}
              onFilterModelChange={handleFilterChange}
              onPageChange={(newPage) => handlePageChange(newPage)}
              onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
              onSelectionModelChange={(newSelectionModel) => {
                handleSelectionModelChange(newSelectionModel);
              }}
              onSortModelChange={handleSortModelChange}
              pageSize={pageSize}
              pagination
              paginationMode="server"
              rowCount={rowCountState}
              rowHeight={75}
              rows={assets}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              selectionModel={selectionModel}
              sortingMode="server"
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'secondary.main',
                },
                '& .MuiDataGrid-toolbarContainer': {
                  backgroundColor: 'background.paper',
                },

                margin: 2,
              }}
            />
            <Menu
              anchorPosition={
                contextMenu !== null
                  ? {
                      top: contextMenu.mouseY,
                      left: contextMenu.mouseX,
                    }
                  : undefined
              }
              anchorReference="anchorPosition"
              componentsProps={{
                root: {
                  onContextMenu: (e) => {
                    e.preventDefault();
                    handleClose();
                  },
                },
              }}
              onClose={handleClose}
              open={contextMenu !== null}
            >
              <MenuItem onClick={() => {}}>Show details</MenuItem>
              <MenuItem onClick={() => {}}>Clone</MenuItem>
              <MenuItem onClick={() => {}}>Edit</MenuItem>
              <MenuItem onClick={() => {}}>Delete</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Assets;