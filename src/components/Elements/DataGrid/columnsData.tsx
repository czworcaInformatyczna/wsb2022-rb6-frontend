import { Box } from '@mui/material';
import { type IDataProvider, useGetAssets, StatusChip, useDeleteAsset } from 'features/assets';
import { useDeleteLicense, useGetLicenses } from 'features/licenses/api';
import { Link } from 'react-router-dom';

export const AssetsData: IDataProvider = {
  getDataHook: useGetAssets,
  addNewLink: '/AddAsset',
  editLink: '/EditAsset',
  deleteHook: useDeleteAsset,
  detailsLink: '/AssetDetails',
  name: 'Assets',
  columns: [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/AssetDetails/' + params.value}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/AssetDetails/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'tag',
      headerName: 'Tag',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/AssetDetails/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      sortable: false,
      disableExport: true,
      filterable: false,
      renderCell: (params) => {
        return (
          <img
            alt="Asset"
            src={'http://137.74.158.36:81/storage/' + params.value}
            style={{
              width: '100%',
              height: undefined,
            }}
          />
        );
      },
    },
    {
      field: 'serial',
      headerName: 'Serial',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/AssetDetails/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'asset_model',
      headerName: 'Model',
      sortable: false,
      width: 200,

      valueGetter: (params) => {
        return params.row.asset_model.name;
      },
    },
    {
      field: 'manufacturer',
      headerName: 'Manufacturer',
      sortable: false,
      width: 200,
      valueGetter: (params) => {
        return params.row.asset_model.manufacturer.name;
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      sortable: false,
      width: 200,
      valueGetter: (params) => {
        return params.row.asset_model.category.name;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,

      renderCell: (params) => StatusChip(params.value),
    },
  ],
};

export const LicensesData: IDataProvider = {
  getDataHook: useGetLicenses,
  deleteHook: useDeleteLicense,
  addNewLink: '/AddLicense',
  editLink: '/EditLicense',
  detailsLink: '/LicenseDetails',
  name: 'Licenses',
  columns: [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/LicenseDetails/' + params.value}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/LicenseDetails/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'key',
      headerName: 'Key',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/LicenseDetails/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 200 },
    { field: 'expiration_date', headerName: 'Expiration date', width: 200 },
    { field: 'licensed_to', headerName: 'Licensed to', width: 200 },
    {
      field: 'quantity',
      align: 'center',
      headerName: 'Quantity',
      width: 100,
    },
    {
      field: 'available',
      align: 'center',
      headerName: 'Available',
      width: 100,
    },
  ],
};
