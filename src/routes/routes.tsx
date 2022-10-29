import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'components/PageNotFound';
import { RequireAuth } from 'routes/RequireAuth';
import { Accessories } from 'features/accessories';
import { Dashboard } from 'features/dashboard';
import { DataProvider } from 'components/Elements/DataGrid';
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

export const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path={routePath.login} element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route path={routePath.main} element={<Layout />}>
        {/* <AppRoutes /> */}
        <Route path={routePath.dashboard} element={<Dashboard />} />
        <Route path={routePath.accessories} element={<Accessories />} />
        <Route element={<DataProvider link="Assets" />} path={routePath.assets} />
        <Route element={<DataProvider link="Licenses" />} path={routePath.licenses} />
        <Route element={<AddAsset />} path={routePath.addAsset} />
        <Route element={<AddAsset />} path={routePath.editAsset} />
        <Route element={<AddLicense />} path={routePath.addLicense} />
        <Route element={<AddLicense />} path={routePath.editLicense} />
        <Route element={<AssetDetails />} path={routePath.assetDetails} />
        <Route element={<Components />} path={routePath.components} />
        <Route element={<LicenseDetails />} path={routePath.licenseDetails} />
        <Route element={<AddManufacturer />} path={routePath.addManufacturer} />
        <Route element={<AddCategory />} path={routePath.addCategory} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Route>
  </Routes>
);
