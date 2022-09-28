import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../shared/components/PageNotFound.tsx/PageNotFound';
import RequireAuth from '../shared/components/RequireAuth';
import { Accessories } from './Accessories/Accessories';
import { Dashboard } from './Dashboard/Dashboard';
import Drawer from './Drawer/drawer';
import { Login } from './Login/Login';
import { DataProvider } from './Assets/dataProvider';

const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route path="/" element={<Drawer />}>
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
