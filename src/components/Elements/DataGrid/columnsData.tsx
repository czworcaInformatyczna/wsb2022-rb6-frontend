import { Box } from '@mui/material';
import { type IDataProvider, useGetAssets, StatusChip } from 'features/assets';
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
