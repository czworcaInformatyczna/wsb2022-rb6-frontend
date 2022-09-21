import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main>
      <h1>Header</h1>
      <Outlet />
      <h2>Footer</h2>
    </main>
  );
};

export default Layout;
