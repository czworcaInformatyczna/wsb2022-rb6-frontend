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
import { Components } from 'features/components';
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

export const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path={routePath.login} element={<Login />} />
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
        <Route element={<AddLicense />} path={routePath.addLicense} />
        <Route element={<AddLicense />} path={routePath.editLicense} />
        <Route element={<AssetDetails />} path={routePath.assetDetails} />
        <Route element={<Components />} path={routePath.components} />
        <Route element={<LicenseDetails />} path={routePath.licenseDetails} />
        <Route element={<AddManufacturer />} path={routePath.addManufacturer} />
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
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Route>
  </Routes>
);
