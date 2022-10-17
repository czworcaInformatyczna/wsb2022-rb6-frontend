import { type ILogin } from 'features/login/types';
import { apiClient } from 'lib/axios';
import { apiUrl } from 'routes';

export const getToken = async ({ email, password }: ILogin): Promise<any> => {
  {
    try {
      return await apiClient.post(apiUrl.login, { password, email });
    } catch (e: any) {
      if (e?.response?.status === 401) throw Error('Invalid credentials');
      else throw Error('Something went wrong');
    }
  }
};
