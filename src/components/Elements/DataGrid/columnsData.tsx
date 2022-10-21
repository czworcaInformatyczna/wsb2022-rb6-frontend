import { Box } from '@mui/material';
import { type IDataProvider, useGetAssets, StatusChip } from 'features/assets';
import { useGetLicenses } from 'features/licenses/api';
import { Link } from 'react-router-dom';

export const AssetsData: IDataProvider = {
  getDataHook: useGetAssets,
  addNewLink: '/AddAsset',
  editLink: '/EditAsset',
  detailsLink: '/AssetDetails',
  name: 'Assets',
  columns: [
    {
      field: 'id',
      width: 90,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/AssetDetails/' + params.value}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'name',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/AssetDetails/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'image',
      width: 150,
      sortable: false,
      disableExport: true,
      filterable: false,
      renderCell: (params) => (
        <img
          alt="Asset"
          src={params.value}
          style={{
            width: '100%',
            height: undefined,
          }}
        />
      ),
    },
    {
      field: 'serial',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/AssetDetails/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    { field: 'model', width: 200 },
    { field: 'manufacturer', width: 200 },
    { field: 'category', width: 200 },
    {
      field: 'status',
      width: 150,

      renderCell: (params) => StatusChip(params.value),
    },
  ],
};

export const LicensesData: IDataProvider = {
  getDataHook: useGetLicenses,
  addNewLink: '/AddLicense',
  editLink: '/AddLicense',
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
