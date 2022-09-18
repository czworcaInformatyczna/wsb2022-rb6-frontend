import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './Assets/dataProvider';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="Assets" element={<DataProvider link="Assets" />} />
    </Routes>
  );
};

export default AppRoutes;
