import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'components/Pages/PageNotFound';
import RequireAuth from 'shared/components/RequireAuth';
import { Accessories } from 'components/Pages/Accessories';
import { Dashboard } from 'components/Pages/Dashboard';
import { Layout } from 'components/Layout';
import { Login } from 'components/Pages/Login';
import { DataProvider } from 'Assets/dataProvider';

const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route path="/" element={<Layout />}>
        {/* <AppRoutes /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accessories" element={<Accessories />} />
        <Route element={<DataProvider link="Assets" />} path="Assets" />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Route>
  </Routes>
);
export default AppRoutes;
