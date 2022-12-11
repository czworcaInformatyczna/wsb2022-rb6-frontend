import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'components/PageNotFound';
import { RequireAuth } from 'routes/RequireAuth';
import { Accessories } from 'features/accessories';
import { Dashboard } from 'features/dashboard';
import { DataGridTemplate } from 'components/Elements/DataGrid';
import { Layout } from 'components/Layout';
import { Login } from 'features/login';
import AddAsset from 'features/assets/components/AddAsset';
import { routePath } from 'routes';
import { AssetDetails } from 'features/assets/components/AssetDetails';
import AddLicense from 'features/licenses/components/AddLicense';
import { LicenseDetails } from 'features/licenses/components/LicenseDetails';
import { AddManufacturer } from 'features/manufacturer/components/AddManufacturer';
import { AddCategory } from 'features/category/components/AddCategory';
import { AddModel } from 'features/model/components/AddModel';
import * as columns from 'components/Elements/DataGrid/columnsData';
import { Statuses } from 'features/assets';
import { AddRole } from 'features/roles/components/AddRole';
import { RoleDetails } from 'features/roles/components/RoleDetails';
import { AddUser } from 'features/users/components/AddUser';
import { UserDetails } from 'features/users/components/UserDetails';
import ChangeStatus from 'features/assets/components/ChangeStatus';
import { AddUserToRole } from 'features/roles/components/AddUserToRole';
import { AddMaintenance } from 'features/assets/components/detailsComponents/AddMaintenance';
import { AddComponent } from 'features/components/components/AddComponent';
import DeployLicense from 'features/licenses/components/DeployLicense';
import { ChangePassword } from 'features/users/components/ChangePassword';
import { MyProfile } from 'features/users/components/MyProfile';
import UploadAvatar from 'features/users/components/UploadAvatar';
import UpdatePhoneNumber from 'features/users/components/UpdatePhoneNumber';
import { ForgotPassword } from 'features/users/components/ForgotPassword';

export const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path={routePath.login} element={<Login />} />
    <Route path={routePath.resetPassword} element={<ForgotPassword />} />
    <Route element={<RequireAuth />}>
      <Route path={routePath.main} element={<Layout />}>
        {/* <AppRoutes /> */}
        <Route path={routePath.dashboard} element={<Dashboard />} />
        <Route path={routePath.accessories} element={<Accessories />} />
        <Route element={<DataGridTemplate data={columns.AssetsData} />} path={routePath.assets} />
        <Route
          element={
            <DataGridTemplate data={columns.AssetsData} key="Assets" status={Statuses.Archived} />
          }
          path={routePath.assetsArchived}
        />
        <Route
          element={
            <DataGridTemplate data={columns.AssetsData} key="Assets" status={Statuses.Deployed} />
          }
          path={routePath.assetsDeployed}
        />
        <Route
          element={
            <DataGridTemplate
              data={columns.AssetsData}
              key="Assets"
              status={Statuses.Maintenance}
            />
          }
          path={routePath.assetsMaintenance}
        />
        <Route
          element={
            <DataGridTemplate
              data={columns.AssetsData}
              key="Assets"
              status={Statuses.ReadyToDeploy}
            />
          }
          path={routePath.assetsReadyToDeploy}
        />
        <Route
          element={<DataGridTemplate key="Licenses" data={columns.LicensesData} />}
          path={routePath.licenses}
        />
        <Route element={<AddAsset key="AddAsset" />} path={routePath.addAsset} />
        <Route element={<AddAsset key="EditAsset" />} path={routePath.editAsset} />
        <Route element={<AddLicense key="AddLicense" />} path={routePath.addLicense} />
        <Route element={<AddLicense key="EditLicense" />} path={routePath.editLicense} />
        <Route element={<AssetDetails />} path={routePath.assetDetails} />
        <Route
          element={<DataGridTemplate key="Components" data={columns.ComponentsData} />}
          path={routePath.components}
        />
        <Route element={<LicenseDetails />} path={routePath.licenseDetails} />
        <Route
          element={<AddManufacturer key="AddManufacturer" />}
          path={routePath.addManufacturer}
        />
        <Route
          element={<AddManufacturer key="EditManufacturer" />}
          path={routePath.editManufacturer}
        />
        <Route element={<AddCategory />} path={routePath.addCategory} />
        <Route element={<AddModel key="AddModel" />} path={routePath.addModel} />
        <Route element={<AddModel key="EditModel" />} path={routePath.editModel} />
        <Route
          element={<DataGridTemplate key="Models" data={columns.ModelsData} />}
          path={routePath.models}
        />
        <Route
          element={<DataGridTemplate key="Roles" data={columns.RolesData} />}
          path={routePath.roles}
        />
        <Route
          element={<DataGridTemplate key="Manufacturers" data={columns.ManufacturerData} />}
          path={routePath.manufacturers}
        />
        <Route element={<AddRole key="AddRole" />} path={routePath.addRole} />
        <Route element={<AddRole key="EditRole" />} path={routePath.editRole} />
        <Route element={<RoleDetails />} path={routePath.roleDetails} />
        <Route
          element={<DataGridTemplate key="Users" data={columns.UsersData} />}
          path={routePath.users}
        />
        <Route element={<AddUser key="AddUser" />} path={routePath.addUser} />
        <Route element={<AddUser key="EditUser" />} path={routePath.editUser} />
        <Route element={<UserDetails />} path={routePath.userDetails} />
        <Route element={<ChangeStatus />} path={routePath.assetChangeStatus} />
        <Route element={<AddUserToRole />} path={routePath.addToRole} />
        <Route
          element={<AddMaintenance key="AddMaintenance" />}
          path={routePath.addAssetMaintenance}
        />
        <Route
          element={<AddMaintenance key="EditMaintenance" />}
          path={routePath.editAssetMaintenances}
        />
        <Route element={<AddComponent key="AddComponent" />} path={routePath.addComponent} />
        <Route element={<AddComponent key="EditComponent" />} path={routePath.editComponent} />
        <Route element={<DeployLicense />} path={routePath.deployLicense} />
        <Route element={<ChangePassword />} path={routePath.changePassword} />
        <Route element={<MyProfile />} path={routePath.profile} />
        <Route element={<UploadAvatar />} path={routePath.avatar} />
        <Route element={<UpdatePhoneNumber />} path={routePath.phoneNumber} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Route>
  </Routes>
);
