import { Route, Routes } from 'react-router-dom';
import AddAsset from '../components/Forms/AddAsset/AddAsset';
import { Layout } from '../components/Layout';
import { PageNotFound } from '../components/PageNotFound';
import { Accessories } from '../features/accessories';
import { DataProvider } from '../features/assets';
import { Dashboard } from '../features/dashboard';
import { Login } from '../features/login';

import { RequireAuth } from './RequireAuth';

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
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Route>
  </Routes>
);
