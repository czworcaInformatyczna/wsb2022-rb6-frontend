import { type ILogin } from '../../Components/Login/Login';
import apiClient from './apiClient';

// const urlNot = '/login?password=wrong&email=adam@user.pl';

const getToken = async ({ email, password }: ILogin) => {
  const urlOk = `/login?password=${password}&email=${email}`;
  {
    try {
      return await apiClient.get(urlOk);
    } catch (e) {
      console.error(e);
    }
  }
};

export default {
  getToken,
};
