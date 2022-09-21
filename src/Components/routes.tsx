import { Route, Navigate } from 'react-router-dom';
import Drawer from './Drawer/drawer';
import { Login } from './Login/Login';

const AppRoutes = (): JSX.Element => (
  <>
    <Route path="login" element={<Login />} />
    <Route path="main" element={<Drawer />} />
    {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </>
);
export default AppRoutes;
