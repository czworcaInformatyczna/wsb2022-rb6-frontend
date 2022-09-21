import { type ILogin } from '../../Components/Login/Login';
import { apiClient } from './apiClient';

// const urlNot = '/login?password=wrong&email=adam@user.pl';

const getToken = async ({ email, password }: ILogin) => {
  const controller = new AbortController();
  const urlOk = `/login?password=${password}&email=${email}`;
  {
    try {
      return await apiClient.get(urlOk, { signal: controller.signal });
    } catch (e) {
      console.error(e);
    }
  }
};

export default {
  getToken,
};

// abort controller
