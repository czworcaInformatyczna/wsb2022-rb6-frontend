import { Box } from '@mui/material';
import { type IDataProvider, useGetAssets, StatusChip, useDeleteAsset } from 'features/assets';
import { useDeleteLicense, useGetLicenses } from 'features/licenses/api';
import { useDeleteModel, useGetModels } from 'features/model/api';
import { useDeleteRole, useGetRoles } from 'features/roles/api';
import { useDeleteUser, useGetUsers } from 'features/users/api';
import { Link } from 'react-router-dom';
import { changeDateTimeFormat } from 'utils';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const AssetsData: IDataProvider = {
  getDataHook: useGetAssets,
  addNewLink: '/AddAsset',
  editLink: '/EditAsset/:id',
  deleteHook: useDeleteAsset,
  detailsLink: '/AssetDetails/:id',
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
  editLink: '/EditLicense/:id',
  detailsLink: '/LicenseDetails/:id',
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

export const ModelsData: IDataProvider = {
  getDataHook: useGetModels,
  addNewLink: '/Model/Add',
  editLink: '/Model/Edit/:id',
  deleteHook: useDeleteModel,
  detailsLink: null,
  name: 'Models',
  columns: [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      renderCell: (params) => <Box>{params.value}</Box>,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => <Box>{params.value}</Box>,
    },
    {
      field: 'category',
      headerName: 'Category',

      width: 200,

      valueGetter: (params) => {
        return params.row.category.name;
      },
    },
    {
      field: 'manufacturer',
      headerName: 'Manufacturer',
      width: 200,
      valueGetter: (params) => {
        return params.row.manufacturer.name;
      },
    },
    {
      field: 'created_at',
      headerName: 'Create date',
      flex: 1,
      valueGetter: (params) => {
        return params.row.created_at;
      },
      renderCell: (params) => <Box>{changeDateTimeFormat(params.value)}</Box>,
    },
  ],
};

export const RolesData: IDataProvider = {
  getDataHook: useGetRoles,
  addNewLink: '/Roles/Add',
  editLink: '/Roles/Edit/:id',
  deleteHook: useDeleteRole,
  detailsLink: '/Roles/Details/:id',
  name: 'Roles',
  columns: [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/Roles/Details/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/Roles/Details/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'permissions',
      headerName: 'Permissions',
      flex: 1,

      valueGetter: (params) => {
        let permissions = '';
        params.row.permissions.map(
          (permission: { name: string }) => (permissions += permission.name + ', '),
        );
        return permissions;
      },
    },
  ],
};

export const UsersData: IDataProvider = {
  getDataHook: useGetUsers,
  addNewLink: '/Users/Add',
  editLink: '/Users/Edit/:id',
  deleteHook: useDeleteUser,
  detailsLink: '/Users/Details/:id',
  name: 'Users',
  columns: [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/Users/Details/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/Users/Details/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      align: 'center',
      field: 'activated',
      headerName: 'Confirmed?',
      width: 100,
      renderCell: (params) => {
        return params.row.activated ? (
          <CheckIcon color="success" />
        ) : (
          <Box>
            <CloseIcon color="error" />
          </Box>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box component={Link} sx={{ color: 'text.primary' }} to={'/Users/Details/' + params.id}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'surname',
      headerName: 'Surname',
      width: 200,
      renderCell: (params) => <Box>{params.value}</Box>,
    },
    {
      field: 'phone_number',
      headerName: 'Phone number',
      width: 200,
      renderCell: (params) => <Box>{params.value}</Box>,
    },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 200,

      valueGetter: (params) => {
        let roles = '';
        params.row.roles.map((role: { name: string }) => (roles += role.name + ', '));
        return roles;
      },
    },
  ],
};
