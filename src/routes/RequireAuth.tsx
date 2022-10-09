import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider/useAuth';
import Cookies from 'js-cookie';
import { emailCookie, tokenCookie } from 'providers/AuthProvider';

export const RequireAuth = () => {
  const token = Cookies.get(tokenCookie);
  const email = Cookies.get(emailCookie);

  const { auth } = useAuth();
  const location = useLocation();

  if (token && email) return <Outlet />;

  return auth.email ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
