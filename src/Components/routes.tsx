import { Routes, Route, Navigate } from 'react-router-dom';
import Drawer from './Drawer/drawer';
import { Login } from './Login/Login';

const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/main" element={<Drawer />} />
    <Route path="/" element={<Navigate to="/login" replace />} />
  </Routes>
);
export default AppRoutes;
