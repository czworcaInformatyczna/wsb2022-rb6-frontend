import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './Assets/dataProvider';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DataProvider link="Assets" />} path="Assets" />
    </Routes>
  );
};

export default AppRoutes;
