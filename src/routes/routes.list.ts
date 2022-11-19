export const apiUrl = {
  login: `/login`,
  assetsCategory: '/assets/category',
  assetsModel: '/asset_model',
  assets: '/asset',
  assetsById: '/asset/:id',
  assetFilesById: '/asset_file/:id',
  assetInfo: '/asset/',
  assetInfoEdit: '/assets/DetailsEdit',
  assetImage: '/assets/Image',
  assetQRCode: '/assets/QRCode',
  assetLicenses: '/assets/Licenses',
  assetComponents: '/assets/Components',
  assetHistory: '/assets/History',
  assetMaintenances: '/asset_maintenances',
  assetFiles: '/asset_file',
  licenses: '/licenses',
  licensesCategory: '/licenses/category',
  licensesManufacturers: '/licenses/manufacturers',
  licenseInfoEdit: '/licenses/DetailsEdit',
  components: '/components',
  component: '/components/:id',
  licenseInfo: '/licenses/Details',
  licenseDeploys: '/licenses/Deployes',
  licenseHistory: '/licenses/History',
  licenseDelete: '/license/Delete',
  addManufacturer: '/manufacturer',
  addAssetCategory: '/asset_category',
  addAssetModel: '/asset_model',
  manufacturerList: '/manufacturer',
  categoryList: '/asset_category',
  users: '/user',
};

export const routePath = {
  main: '/',
  login: '/login',
  dashboard: '/dashboard',
  accessories: '/accessories',
  assets: '/Assets',
  assetChangeStatus: '/Asset/:id/Status',
  assetsArchived: '/Assets/Archived',
  assetsMaintenance: '/Assets/Maintenance',
  assetsReadyToDeploy: '/Assets/ReadyToDeploy',
  assetsDeployed: '/Assets/Deployed',
  addAsset: 'AddAsset',
  editAsset: 'EditAsset/:id',
  assetDetails: 'AssetDetails/:id',
  pageNotFound: '/PageNotFound',
  licenses: 'Licenses',
  addLicense: 'AddLicense',
  editLicense: 'EditLicense/:id',
  components: '/Components',
  licenseDetails: 'LicenseDetails/:id',
  addManufacturer: '/Manufacturer/Add',
  addCategory: '/Category/Add',
  addModel: '/Model/Add',
};
