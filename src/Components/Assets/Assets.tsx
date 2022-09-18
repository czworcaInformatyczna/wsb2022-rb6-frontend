import { Box, Button, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { AssetsProps, AssetsState } from './domain';
import {
  DataGrid,
  GridActionsCellItem,
  GridCallbackDetails,
  GridFilterModel,
  GridRowParams,
  GridSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid';
import testData from './testData.json';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { CustomToolbar } from './customToolbar';
class Assets extends React.Component<AssetsProps, AssetsState> {
  constructor(props: AssetsProps) {
    super(props);
    this.state = {
      loading: true,
      assets: [],
      loadingData: true,
      pageSize: 10,
      rowCountState: 0,
      selectionModel: [],
      contextMenu: null,
    };
  }
  componentDidMount(): void {
    this.setState({
      assets: testData,
      loading: false,
      loadingData: false,
      rowCountState: testData.length,
    });
  }

  setPageSize = (newPageSize: number) => {
    //API CALL GET DATA
    this.setState({
      pageSize: newPageSize,
    });
  };
  setPage = (newPage: number) => {
    //API CALL GET NEW PAGE DATA
  };
  handleSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
    console.log(JSON.stringify(model) + '  =====   ' + JSON.stringify(details)); //API CALL HERE
  };
  setSelectionModel = (newSelectionModel: GridSelectionModel) => {
    console.log(this.state.selectionModel);
    this.setState({
      selectionModel: newSelectionModel,
    });
  };
  onFilterChange = (filterModel: GridFilterModel) => {
    // Here you save the data you need from the filter model
    console.log(filterModel);
  };
  handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(Number(event.currentTarget.getAttribute('data-id')));
    this.setState({
      contextMenu: {
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        elementId: Number(event.currentTarget.getAttribute('data-id')),
      },
    });
  };
  handleClose = () => {
    this.setState({
      contextMenu: null,
    });
  };
  render() {
    const columntsWithAction = [
      ...this.props.data.columns,
      ...[
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
              onClick={() => {}}
              label="Clone"
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Edit">
                  <Box>
                    <EditIcon sx={{ color: 'warning.main' }} />{' '}
                  </Box>
                </Tooltip>
              }
              onClick={() => {}}
              label="Edit"
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Delete">
                  <Box>
                    <DeleteForeverIcon sx={{ color: 'error.main' }} />
                  </Box>
                </Tooltip>
              }
              onClick={() => {}}
              label="Delete"
            />,
          ],
          width: 150,
        },
      ],
    ];
    return (
      <Box>
        {this.state.loading && <Box>Loading</Box>}
        {!this.state.loading && (
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '75px' }}
            pt={2}
          >
            <Grid item xl={9} lg={9} md={9} sm={6} xs={6}>
              <Typography ml={2} variant="h4">
                {this.props.data.name}
              </Typography>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
              <Box mr={2} display="flex" justifyContent="end">
                <Button size="medium" variant="outlined" color="success">
                  Add new
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                loading={this.state.loadingData}
                autoHeight
                rowHeight={75}
                sortingMode="server"
                onSortModelChange={this.handleSortModelChange}
                pageSize={this.state.pageSize}
                paginationMode="server"
                onPageSizeChange={(newPageSize) => this.setPageSize(newPageSize)}
                onPageChange={(newPage) => this.setPage(newPage)}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                pagination
                rowCount={this.state.rowCountState}
                filterMode="server"
                onFilterModelChange={this.onFilterChange}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
                  this.setSelectionModel(newSelectionModel);
                }}
                selectionModel={this.state.selectionModel}
                keepNonExistentRowsSelected
                components={{
                  Toolbar: CustomToolbar,
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'secondary.main',
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                    backgroundColor: 'background.paper',
                  },

                  margin: 2,
                }}
                columns={columntsWithAction}
                rows={this.state.assets}
                disableColumnMenu
                componentsProps={{
                  row: {
                    onContextMenu: this.handleContextMenu,
                    style: { cursor: 'context-menu' },
                  },
                  toolbar: {
                    selectedItems: this.state.selectionModel,
                  },
                }}
              />
              <Menu
                open={this.state.contextMenu !== null}
                onClose={this.handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  this.state.contextMenu !== null
                    ? {
                        top: this.state.contextMenu['mouseY'],
                        left: this.state.contextMenu['mouseX'],
                      }
                    : undefined
                }
                componentsProps={{
                  root: {
                    onContextMenu: (e) => {
                      e.preventDefault();
                      this.handleClose();
                    },
                  },
                }}
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
  }
}

export default Assets;
