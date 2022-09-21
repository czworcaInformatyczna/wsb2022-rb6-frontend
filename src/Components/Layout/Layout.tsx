import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = (): JSX.Element => {
  return (
    <>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h2>Footer</h2>
      </footer>
    </>
  );
};

export default Layout;
