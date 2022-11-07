import { Box, Button, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { type ContextMenu, type AssetsProps, CustomToolbar, useDeleteAsset } from 'features/assets';
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
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { getVariant } from 'utils';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { useTheme } from '@mui/material/styles';

export const DataGridTemplate = (Props: AssetsProps) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [filter, setFilter] = React.useState<string>('');
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(0);
  const [rowCountState, setRowCountState] = React.useState<number>(0);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [contextMenu, setContextMenu] = React.useState<ContextMenu | null>(null);
  const deleteAsset = useDeleteAsset();
  const [savedState, setSavedState] = React.useState<{
    initialState: GridInitialState;
  }>({
    initialState: { columns: { columnVisibilityModel: {} } },
  });

  const { data: assets, isLoading } = Props.data.getDataHook({
    per_page: pageSize,
    page: page + 1,
    search: filter,
    ...(Props.status && { status: Props.status }),
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
    if (assets !== undefined) {
      setRowCountState(assets.total);
    }

    getDataGridState();
  }, [assets, assets?.total, getDataGridState]);
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
    setPage(newPage);
  };

  const handleSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
    console.log(JSON.stringify(model) + '  =====   ' + JSON.stringify(details)); // API CALL HERE
  };

  const handleSelectionModelChange = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const handleFilterChange = (filterModel: GridFilterModel) => {
    setFilter(filterModel?.quickFilterValues === undefined ? '' : filterModel.quickFilterValues[0]);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      elementId: Number(event.currentTarget.getAttribute('data-id')),
    });
  };

  const handleDelete = (id: number) => {
    const bgColor = { sx: { backgroundColor: theme.palette.background.paper } };
    confirm({
      title: <Box sx={{ color: 'error.main' }}>Are you sure?</Box>,
      description: <Box sx={{ color: theme.palette.text.primary }}>This action is permanent!</Box>,
      contentProps: bgColor,
      titleProps: bgColor,
      dialogActionsProps: bgColor,
      confirmationButtonProps: { variant: 'contained', color: 'success' },
      cancellationButtonProps: { variant: 'contained', color: 'error' },
    })
      .then(() => {
        deleteAsset.mutate(id, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar(Props.data.name + ' has been deleted', { variant });
          },
        });
        return null;
      })
      .catch(() => {});
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const resetSelection = () => {
    setSelectionModel([]);
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
          onClick={() => {
            handleDelete(Number(params.id));
          }}
        />,
      ],
      width: 150,
    },
  ];
  const columnsWithAction: GridColumns = [...Props.data.columns, ...actions];
  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      {Props.data !== undefined && (
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
                  resetSelection: resetSelection,
                },
              }}
              disableColumnMenu
              disableSelectionOnClick
              filterMode="server"
              initialState={savedState.initialState}
              keepNonExistentRowsSelected
              loading={isLoading}
              onColumnVisibilityModelChange={saveColumnsVisibility}
              onFilterModelChange={handleFilterChange}
              onPageChange={(newPage) => handlePageChange(newPage)}
              onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
              onSelectionModelChange={(newSelectionModel) => {
                handleSelectionModelChange(newSelectionModel);
              }}
              onSortModelChange={handleSortModelChange}
              page={page}
              pageSize={pageSize}
              pagination
              paginationMode="server"
              rowCount={rowCountState}
              rowHeight={75}
              rows={assets === undefined ? [] : assets.data}
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
              <MenuItem
                onClick={() => {
                  navigate(Props.data.detailsLink + '/' + contextMenu?.elementId);
                }}
              >
                Show details
              </MenuItem>
              <MenuItem onClick={() => {}}>Clone</MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(Props.data.editLink + '/' + contextMenu?.elementId);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(Number(contextMenu?.elementId))}>
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
