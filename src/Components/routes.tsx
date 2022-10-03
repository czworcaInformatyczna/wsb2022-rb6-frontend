import { Routes, Route } from 'react-router-dom';
import AddAsset from './Forms/AddAsset/AddAsset';
import { DataProvider } from './Assets/dataProvider';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DataProvider link="Assets" />} path="Assets" />
      <Route element={<AddAsset />} path="AddAsset" />
    </Routes>
  );
};

export default AppRoutes;
