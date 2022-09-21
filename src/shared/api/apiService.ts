import { type ILogin } from '../../Components/Login/Login';
import { apiClient } from './apiClient';

// const urlNot = '/login?password=wrong&email=adam@user.pl';

const getToken = async ({ email, password }: ILogin): Promise<any> => {
  const controller = new AbortController();
  const urlOk = `/login?password=${password}&email=${email}`;
  {
    try {
      return await apiClient.get(urlOk, { signal: controller.signal });
    } catch (e) {
      //   if (!e?.response) {
      //     console.error('No response from server');
      //   } else if (e.response?.status === 400) {
      //     console.error('Missing email or password');
      //   }
      // }
    }
  }
};

export default {
  getToken,
};

// abort controller
