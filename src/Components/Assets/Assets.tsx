import { Box, Button, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { type AssetsProps, type AssetsState } from './domain';
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
class Assets extends React.Component<AssetsProps, AssetsState> {
  private constructor(props: AssetsProps) {
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
    // API CALL GET DATA
    this.setState({
      pageSize: newPageSize,
    });
  };

  setPage = (newPage: number) => {
    // API CALL GET NEW PAGE DATA
    console.log(newPage);
  };

  handleSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
    console.log(JSON.stringify(model) + '  =====   ' + JSON.stringify(details)); // API CALL HERE
  };

  setSelectionModel = (newSelectionModel: GridSelectionModel) => {
    console.log(this.state.selectionModel);
    this.setState({
      selectionModel: newSelectionModel,
    });
  };

  handleFilterChange = (filterModel: GridFilterModel) => {
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
    const columnsWithAction = [...this.props.data.columns];
    columnsWithAction.push({
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
    });

    return (
      <Box>
        {this.state.loading && <Box>Loading</Box>}
        {!this.state.loading && (
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
                {this.props.data.name}
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
                    onContextMenu: this.handleContextMenu,
                    style: { cursor: 'context-menu' },
                  },
                  toolbar: {
                    selectedItems: this.state.selectionModel,
                  },
                }}
                disableColumnMenu
                disableSelectionOnClick
                filterMode="server"
                keepNonExistentRowsSelected
                loading={this.state.loadingData}
                onFilterModelChange={this.handleFilterChange}
                onPageChange={(newPage) => this.setPage(newPage)}
                onPageSizeChange={(newPageSize) => this.setPageSize(newPageSize)}
                onSelectionModelChange={(newSelectionModel) => {
                  this.setSelectionModel(newSelectionModel);
                }}
                onSortModelChange={this.handleSortModelChange}
                pageSize={this.state.pageSize}
                pagination
                paginationMode="server"
                rowCount={this.state.rowCountState}
                rowHeight={75}
                rows={this.state.assets}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                selectionModel={this.state.selectionModel}
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
                  this.state.contextMenu !== null
                    ? {
                        top: this.state.contextMenu.mouseY,
                        left: this.state.contextMenu.mouseX,
                      }
                    : undefined
                }
                anchorReference="anchorPosition"
                componentsProps={{
                  root: {
                    onContextMenu: (e) => {
                      e.preventDefault();
                      this.handleClose();
                    },
                  },
                }}
                onClose={this.handleClose}
                open={this.state.contextMenu !== null}
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
