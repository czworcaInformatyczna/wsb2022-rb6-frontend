import { useNavigate } from 'react-router';
import { getErrorMessage } from 'utils/getErrorMessage';
import { getToken, type ILogin } from 'features/login';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { type IAuth, tokenCookie, emailCookie } from 'providers/AuthProvider';
export const useAuthContextValue = () => {
  const [auth, setAuth] = useState<IAuth>({ email: null, token: null });
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ email: '', token: '' });
    Cookies.remove(tokenCookie);
    Cookies.remove(emailCookie);
  };

  const handleLogin = async (userData: ILogin, setLoading: any) => {
    const { email, password } = userData;
    setLoading(true);
    let response: any;
    try {
      response = await getToken({ email, password });
    } catch (error) {
      throw Error(getErrorMessage(error));
    }

    const token: string = response?.data.access_token;
    if (token) {
      Cookies.set(tokenCookie, token);
      Cookies.set(emailCookie, email);
      setAuth({ email, token });
      navigate('/dashboard');
    } else {
      throw Error('Wrong email or password');
    }
  };

  return { auth, setAuth, handleLogout, handleLogin };
};
