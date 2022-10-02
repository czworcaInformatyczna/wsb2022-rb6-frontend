import { AppProvider } from '@/providers/AppProvider';
import { AppRoutes } from '@/routes';

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <AppRoutes />;
    </AppProvider>
  );
};

export default App;
