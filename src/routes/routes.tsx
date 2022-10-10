import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'components/PageNotFound';
import { RequireAuth } from 'routes/RequireAuth';
import { Accessories } from 'features/accessories';
import { Dashboard } from 'features/dashboard';
import { DataProvider } from 'features/assets';
import { Layout } from 'components/Layout';
import { Login } from 'features/login';
import AddAsset from 'features/assets/components/AddAsset';

export const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route path="/" element={<Layout />}>
        {/* <AppRoutes /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route element={<DataProvider link="Assets" />} path="/Assets" />
        <Route element={<AddAsset />} path="AddAsset" />
        <Route element={<AddAsset />} path="EditAsset/:id" />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Route>
  </Routes>
);
