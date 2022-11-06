export const apiUrl = {
  login: `/login`,
  assetsCategory: '/assets/category',
  assetsModel: '/asset_model',
  assets: '/asset',
  assetsDelete: '/asset/:id',
  assetInfo: '/asset/',
  assetInfoEdit: '/assets/DetailsEdit',
  assetImage: '/assets/Image',
  assetQRCode: '/assets/QRCode',
  assetLicenses: '/assets/Licenses',
  assetComponents: '/assets/Components',
  assetHistory: '/assets/History',
  assetMaintenances: '/asset/Maintenances',
  assetFiles: '/asset/Files',
  licenses: '/licenses',
  licensesCategory: '/licenses/category',
  licensesManufacturers: '/licenses/manufacturers',
  licenseInfoEdit: '/licenses/DetailsEdit',
  components: '/components',
  component: '/components/:id',
  licenseInfo: '/licenses/Details',
  licenseDeploys: '/licenses/Deployes',
  licenseHistory: '/licenses/History',
  addAssetManufacturer: '/asset_manufacturer',
  addAssetCategory: '/asset_category',
  addAssetModel: '/asset_model',
  manufacturerList: '/asset_manufacturer',
  categoryList: '/asset_category',
};

export const routePath = {
  main: '/',
  login: '/login',
  dashboard: '/dashboard',
  accessories: '/accessories',
  assets: '/Assets',
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
