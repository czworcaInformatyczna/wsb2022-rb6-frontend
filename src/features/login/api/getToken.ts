import { type ILogin } from '../';
import { apiClient } from '../../../lib/axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getToken = async ({ email, password }: ILogin): Promise<any> => {
  const controller = new AbortController();
  const urlOk = `/login?password=${password}&email=${email}`;
  {
    try {
      const data = await apiClient.post(urlOk, { signal: controller.signal });
      return data;
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
