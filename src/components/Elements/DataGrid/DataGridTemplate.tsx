import { Box, Button, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { type ContextMenu, type AssetsProps, CustomToolbar, type ISort } from 'features/assets';
import { type GridColumnVisibilityModel } from '@mui/x-data-grid';
import { type GridColumns } from '@mui/x-data-grid';
import {
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
import { convertUrl, getVariant } from 'utils';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { useTheme } from '@mui/material/styles';
import Labels from 'features/assets/components/Labels';
import { CreateModal } from '../CreateModal';
import { routePath } from 'routes';
import { convertToExportUrl } from 'utils/convertToExportUrl';
import downloadFile from 'utils/downloadFile';
import { PermissionContext } from 'providers/Permissions/Permission.provider';

export const DataGridTemplate = (Props: AssetsProps) => {
  const permission = useContext(PermissionContext);
  const [isManage, setIsManage] = useState<boolean>(false);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [filter, setFilter] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<ISort | null>(null);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const deleteAsset = Props.data.deleteHook();
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<Box />);
  const { data: assets, isLoading } = Props.data.getDataHook({
    per_page: pageSize,
    page: page + 1,
    search: filter,
    ...((Props.status || Props.status === 0) && { status: Props.status }),
    ...(sort !== null && sort),
  });

  const handleExport = () => {
    const exportUrl = convertToExportUrl(Props.data.exportLink, {
      per_page: '2',
      page: '1',
      ...(filter !== '' && { search: filter }),
      ...((Props.status || Props.status === 0) && { status: Props.status }),
      ...(sort !== null && sort),
      export: 'true',
    });
    downloadFile(exportUrl, Props.data.name + '.xlsx');
  };

  const handleOpenModal = (id: GridSelectionModel | number | null) => {
    if (id !== null) {
      setModalContent(<Labels id={id} handleClose={() => setOpen(false)} />);
      setOpen(true);
    }
  };

  const getColumnsState = () => {
    const columnsState = localStorage.getItem(Props.data.name + 'ColumnsVisibility');
    if (columnsState) return JSON.parse(columnsState);
    return null;
  };

  const getDataGridState = React.useCallback(() => {
    const pageSizeStorage = localStorage.getItem(Props.data.name + 'PageSize');

    if (pageSizeStorage) setPageSize(Number(pageSizeStorage));
  }, [Props.data.name]);

  React.useEffect(() => {
    getDataGridState();
    if (permission) {
      const check = permission.find((perm) => Props.data.permission === perm);
      setIsManage(check ? true : false);
    }
  }, [Props.data.permission, getDataGridState, permission]);

  const navigate = useNavigate();
  const saveColumnsVisibility = (newVisibilityModel: GridColumnVisibilityModel) => {
    localStorage.setItem(Props.data.name + 'ColumnsVisibility', JSON.stringify(newVisibilityModel));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    localStorage.setItem(Props.data.name + 'PageSize', JSON.stringify(newPageSize));
    setPageSize(newPageSize);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length === 0) setSort(null);
    else setSort({ order: model[0].sort, sort: model[0].field });
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

  const handleDelete = (id: number | string) => {
    const bgColor = { sx: { backgroundColor: theme.palette.background.paper } };
    confirm({
      title: (
        <Box component="span" sx={{ color: 'error.main' }}>
          Are you sure?
        </Box>
      ),
      description: (
        <Box component="span" sx={{ color: theme.palette.text.primary }}>
          This action is permanent!
        </Box>
      ),
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
                <EditIcon sx={{ color: 'warning.main' }} />
              </Box>
            </Tooltip>
          }
          key={params.id}
          label="Edit"
          disabled={Props.data.editLink === null}
          onClick={() => {
            if (Props.data.editLink !== null)
              navigate(convertUrl(Props.data.editLink, { id: params.id }));
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
            handleDelete(params.id);
          }}
        />,
      ],
      width: 150,
    },
  ];
  const columnsWithAction: GridColumns = isManage
    ? [...Props.data.columns, ...actions]
    : [...Props.data.columns];
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
      <CreateModal open={open} content={modalContent} setOpen={setOpen} />
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
              {isManage && (
                <Button
                  color="success"
                  onClick={() => navigate(Props.data.addNewLink)}
                  size="medium"
                  variant="contained"
                >
                  Add new
                </Button>
              )}
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
                  deleteHook: Props.data.deleteHook,
                  handleModal: handleOpenModal,
                  name: Props.data.name,
                  handleExport: handleExport,
                },
              }}
              disableColumnMenu
              disableSelectionOnClick
              filterMode="server"
              initialState={{
                columns: {
                  columnVisibilityModel: getColumnsState(),
                },
              }}
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
              getRowId={
                Props.data.name === 'Categories'
                  ? (row: any) => row.category_type + '/' + row.category_id
                  : undefined
              }
              rowCount={assets === undefined ? 0 : assets.total}
              rowHeight={75}
              rows={assets === undefined ? [] : assets.data}
              rowsPerPageOptions={[5, 10, 20, 30]}
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
              {Props.data.detailsLink !== null && (
                <MenuItem
                  onClick={() => {
                    navigate(
                      convertUrl(Props.data.detailsLink !== null ? Props.data.detailsLink : '', {
                        id: contextMenu?.elementId,
                      }),
                    );
                  }}
                >
                  Show details
                </MenuItem>
              )}
              {Props.data.name === 'Assets' && [
                isManage && (
                  <MenuItem
                    key="ChangeStatus"
                    onClick={() => {
                      navigate(
                        convertUrl(routePath.assetChangeStatus, { id: contextMenu?.elementId }),
                      );
                    }}
                  >
                    Change status
                  </MenuItem>
                ),
                <MenuItem
                  key="GenerateLabels"
                  onClick={() => {
                    handleOpenModal(contextMenu?.elementId ? contextMenu.elementId : null);
                  }}
                >
                  Generate Label
                </MenuItem>,
              ]}
              {isManage && <MenuItem onClick={() => {}}>Clone</MenuItem>}
              {Props.data.editLink !== null && isManage && (
                <MenuItem
                  onClick={() => {
                    if (Props.data.editLink !== null)
                      navigate(convertUrl(Props.data.editLink, { id: contextMenu?.elementId }));
                  }}
                >
                  Edit
                </MenuItem>
              )}
              {isManage && (
                <MenuItem
                  onClick={() =>
                    handleDelete(contextMenu?.elementId ? contextMenu.elementId.toString() : '')
                  }
                >
                  Delete
                </MenuItem>
              )}
            </Menu>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
