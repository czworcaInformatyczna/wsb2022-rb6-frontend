import { Box, Button, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { type Asset, type ContextMenu, type AssetsProps, CustomToolbar } from 'features/assets';
import { type GridColumnVisibilityModel } from '@mui/x-data-grid';
import { type GridInitialState } from '@mui/x-data-grid';
import { type GridColumns } from '@mui/x-data-grid';
import {
  type GridCallbackDetails,
  type GridFilterModel,
  type GridRowParams,
  type GridSelectionModel,
  type GridSortModel,
} from '@mui/x-data-grid';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import testData from '../api/testData.json';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingScreen } from 'components/Elements/Loading';

export const AssetsTemplate = (Props: AssetsProps) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [assets, setAssets] = React.useState<Asset[]>([]);
  const [loadingData, setLoadingData] = React.useState<boolean>(true);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [rowCountState, setRowCountState] = React.useState<number>(0);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [contextMenu, setContextMenu] = React.useState<ContextMenu | null>(null);

  const [savedState, setSavedState] = React.useState<{
    initialState: GridInitialState;
  }>({
    initialState: { columns: { columnVisibilityModel: {} } },
  });

  const getDataGridState = React.useCallback(() => {
    const columnsVisibility = localStorage.getItem(Props.data.name + 'ColumnsVisibility');
    const pageSizeStorage = localStorage.getItem(Props.data.name + 'PageSize');
    if (columnsVisibility)
      setSavedState((prev) => ({
        initialState: {
          ...prev.initialState,
          columns: { columnVisibilityModel: JSON.parse(columnsVisibility) },
        },
      }));
    if (pageSizeStorage) setPageSize(Number(pageSizeStorage));
  }, [Props.data.name]);

  React.useEffect(() => {
    setAssets(testData);
    setRowCountState(testData.length);
    setLoading(false);
    setLoadingData(false);
    getDataGridState();
  }, [getDataGridState]);
  const navigate = useNavigate();
  const saveColumnsVisibility = (newVisibilityModel: GridColumnVisibilityModel) => {
    localStorage.setItem(Props.data.name + 'ColumnsVisibility', JSON.stringify(newVisibilityModel));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    // API CALL GET DATA
    localStorage.setItem(Props.data.name + 'PageSize', JSON.stringify(newPageSize));
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
          onClick={() => {
            navigate(Props.data.editLink + '/' + params.id);
          }}
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
      {loading && <LoadingScreen displayText size={200} />}
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
            <Typography ml={2} variant="h4" color="primary.main">
              {Props.data.name}
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
            <Box display="flex" justifyContent="end" mr={2}>
              <Button
                color="success"
                onClick={() => navigate(Props.data.addNewLink)}
                size="medium"
                variant="contained"
              >
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
              initialState={savedState.initialState}
              keepNonExistentRowsSelected
              loading={loadingData}
              onColumnVisibilityModelChange={saveColumnsVisibility}
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
              <MenuItem
                onClick={() => {
                  navigate(Props.data.editLink + '/' + contextMenu?.elementId);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={() => {}}>Delete</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
