import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'components/PageNotFound';
import { RequireAuth } from 'routes/RequireAuth';
import { Accessories } from 'features/accessories';
import { Dashboard } from 'features/dashboard';
import { DataProvider } from 'features/assets';
import { Layout } from 'components/Layout';
import { Login } from 'features/login';
import AddAsset from 'features/assets/components/AddAsset';
import { routePath } from 'routes';
import { AssetDetails } from 'features/assets/components/AssetDetails';

export const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path={routePath.login} element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route path={routePath.main} element={<Layout />}>
        {/* <AppRoutes /> */}
        <Route path={routePath.dashboard} element={<Dashboard />} />
        <Route path={routePath.accessories} element={<Accessories />} />
        <Route element={<DataProvider link="Assets" />} path={routePath.assets} />
        <Route element={<AddAsset />} path={routePath.addAsset} />
        <Route element={<AddAsset />} path={routePath.editAsset} />
        <Route element={<AssetDetails />} path={routePath.assetDetails} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Route>
  </Routes>
);
