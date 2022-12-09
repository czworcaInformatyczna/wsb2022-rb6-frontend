export const apiUrl = {
  login: `/login`,
  assetsCategory: '/assets/category',
  assetsModel: '/asset_model',
  assets: '/asset',
  assetsById: '/asset/:id',
  assetFilesById: '/asset_file/:id',
  assetInfo: '/asset/',
  assetInfoEdit: '/assets/DetailsEdit',
  assetImage: '/asset/:id/image',
  assetQRCode: '/assets/QRCode',
  assetLicenses: '/assets/Licenses',
  assetHistory: '/log',
  assetMaintenances: '/asset_maintenance',
  assetFiles: '/asset_file',
  licenses: '/licence',
  licenseById: '/licence/:id',
  licensesCategory: '/licence/category',
  licensesManufacturers: '/licenses/manufacturers',
  licenseInfoEdit: '/licenses/DetailsEdit',
  licenseFile: '/licence/:id/file',
  components: '/asset_component',
  component: '/asset_component/:id',
  licenseDeploys: '/licence/:id/licencables',
  licenseHistory: '/licence/:id/history',
  licenseDelete: '/license/Delete',
  addManufacturer: '/manufacturer',
  addAssetCategory: '/asset_category',
  models: '/asset_model',
  modelsById: '/asset_model/:id',
  addAssetModel: '/asset_model',
  manufacturerList: '/manufacturer',
  categoryList: '/asset_category',
  componentCategoryList: '/asset_component_category',
  roles: '/role',
  rolesById: '/role/:id',
  permissions: '/permission',
  users: '/user',
  usersById: '/user/:id',
  roleUsers: '/role/users/:id',
  addUsersToRole: '/user/massassign/:id',
  removeUserFromRole: '/user/removerole/:id',
  assetComponentCategory: '/asset_component_category',
  assetMaintenanceEdit: '/asset_maintenance/:id',
  licenseCategory: '/licence/category',
  detachLicense: '/licence/:id/licencables/1',
  deleteLicenseFile: '/licence/managment/file/:id',
  downloadLicenseFile: '/licence/managment/file/:id/download',
  avatar: '/avatar/:id',
  changePassword: '/changepassword',
  profile: '/user/self',
  uploadAvatar: '/user/edit',
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
  addAsset: '/AddAsset',
  editAsset: '/EditAsset/:id',
  assetDetails: '/AssetDetails/:id',
  pageNotFound: '/PageNotFound',
  licenses: '/Licenses',
  addLicense: '/AddLicense',
  editLicense: '/License/:id/Edit',
  components: '/Components',
  licenseDetails: '/License/:id/Details',
  addManufacturer: '/Manufacturer/Add',
  addCategory: '/Category/Add',
  addModel: '/Model/Add',
  editModel: '/Model/Edit/:id',
  models: '/Models',
  roles: '/Roles',
  addRole: '/Roles/Add',
  editRole: '/Roles/Edit/:id',
  roleDetails: '/Roles/Details/:id',
  users: '/Users',
  addUser: '/Users/Add',
  editUser: '/Users/Edit/:id',
  userDetails: '/Users/Details/:id',
  addToRole: '/Roles/:id/AddUsers',
  addAssetMaintenance: '/Maintenance/:id/Add',
  editAssetMaintenances: '/asset_maintenance/:id/Edit',
  addComponent: '/Component/Add',
  editComponent: '/Component/:id/Edit',
  deployLicense: '/License/:id/Deploy',
  changePassword: '/Profile/ChangePassword',
  profile: '/Profile',
  avatar: '/Profile/Avatar',
  phoneNumber: '/Profile/PhoneNumber',
};
