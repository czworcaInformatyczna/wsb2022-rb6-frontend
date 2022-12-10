import { Box } from '@mui/material';
import { type IDataProvider, useGetAssets, StatusChip, useDeleteAsset } from 'features/assets';
import { useDeleteLicense, useGetLicenses } from 'features/licenses/api';
import { useDeleteModel, useGetModels } from 'features/model/api';
import { useDeleteRole, useGetRoles } from 'features/roles/api';
import { useDeleteUser, useGetUsers } from 'features/users/api';
import { Link } from 'react-router-dom';
import { changeDateTimeFormat, convertUrl } from 'utils';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useGetComponents, useDeleteComponent } from 'features/components';
import { apiUrl } from 'routes';
import DisplayImage from 'utils/DisplayImage';
import { useDeleteManufacturers, useGetMaintenancePag } from 'features/manufacturer/api';

export const AssetsData: IDataProvider = {
  getDataHook: useGetAssets,
  addNewLink: '/AddAsset',
  editLink: '/EditAsset/:id',
  exportLink: '/asset',
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
          <DisplayImage
            url={
              params.row.has_image
                ? convertUrl(apiUrl.assetsById, { id: params.id }) +
                  '/image.' +
                  params.row.image_extension
                : null
            }
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
  exportLink: '/asset',
  editLink: '/License/:id/Edit',
  detailsLink: '/License/:id/Details',
  name: 'Licenses',
  columns: [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      renderCell: (params) => (
        <Box
          component={Link}
          sx={{ color: 'text.primary' }}
          to={convertUrl('/License/:id/Details', { id: params.id })}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box
          component={Link}
          sx={{ color: 'text.primary' }}
          to={convertUrl('/License/:id/Details', { id: params.id })}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'product_key',
      headerName: 'Key',
      width: 200,
      renderCell: (params) => (
        <Box
          component={Link}
          sx={{ color: 'text.primary' }}
          to={convertUrl('/License/:id/Details', { id: params.id })}
        >
          {params.value}
        </Box>
      ),
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
      field: 'category',
      headerName: 'Category',
      width: 200,
      valueGetter: (params) => {
        return params.row.category.name;
      },
    },
    {
      field: 'slots',

      headerName: 'Slots',
      width: 100,
    },
    { field: 'expiration_date', headerName: 'Expiration date', width: 200 },
    { field: 'email', headerName: 'Licensed to', width: 200 },
    {
      field: 'reassignable',
      headerName: 'Reassignable',
      width: 120,
      align: 'center',
      renderCell: (params) => {
        return params.row.reassignable ? (
          <CheckIcon color="success" />
        ) : (
          <Box>
            <CloseIcon color="error" />
          </Box>
        );
      },
    },
  ],
};

export const ModelsData: IDataProvider = {
  getDataHook: useGetModels,
  addNewLink: '/Model/Add',
  editLink: '/Model/Edit/:id',
  exportLink: '/asset_model',
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
  exportLink: '/asset',
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
  exportLink: '/asset',
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

export const ComponentsData: IDataProvider = {
  getDataHook: useGetComponents,
  addNewLink: '/Component/Add',
  editLink: '/Component/:id/Edit',
  exportLink: '/asset_component',
  deleteHook: useDeleteComponent,
  detailsLink: null,
  name: 'Components',
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
      field: 'serial',
      headerName: 'Serial',
      width: 200,
      renderCell: (params) => <Box>{params.value}</Box>,
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
      field: 'category',
      headerName: 'Category',
      width: 200,
      valueGetter: (params) => {
        return params.row.asset_component_category.name;
      },
    },
    {
      field: 'asset_id',
      headerName: 'Assigned to',
      width: 200,
      valueGetter: (params) => {
        return params.row.asset_id;
      },
      renderCell: (params) => (
        <Box
          component={Link}
          sx={{ color: 'text.primary' }}
          to={'/AssetDetails/' + params.row.asset_id}
        >
          Asset - {params.value}
        </Box>
      ),
    },
  ],
};

export const ManufacturerData: IDataProvider = {
  getDataHook: useGetMaintenancePag,
  addNewLink: '/Manufacturer/Add',
  editLink: '/Manufacturer/:id/Edit',
  exportLink: '/manufacturer',
  deleteHook: useDeleteManufacturers,
  detailsLink: null,
  name: 'Manufacturers',
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
      flex: 1,
      renderCell: (params) => <Box>{params.value}</Box>,
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 200,
      renderCell: (params) => <Box>{changeDateTimeFormat(params.value)}</Box>,
    },
  ],
};
