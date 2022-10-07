import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'components/PageNotFound';
import { RequireAuth } from 'routes/RequireAuth';
import { Accessories } from 'features/accessories';
import { Dashboard } from 'features/dashboard';
import { DataProvider } from 'features/assets';
import { Layout } from 'components/Layout';
import { Login } from 'features/login';
<<<<<<< HEAD
import AddAsset from 'features/Forms/AddAsset/AddAsset';
=======
import AddAsset from 'features/assets/components/AddAsset';
>>>>>>> 34e97a1c59a41b3ae4911bb2da9d51cd55f09b07

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
