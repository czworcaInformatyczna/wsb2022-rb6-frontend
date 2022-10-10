import { type ILogin } from 'features/login/types';
import { apiClient } from 'lib/axios';

export const getToken = async ({ email, password }: ILogin): Promise<any> => {
  const URL = `/login`;
  {
    try {
      return await apiClient.post(URL, { password, email });
    } catch (e: any) {
      if (e?.response?.status === 401) throw Error('Invalid credentials');
      else throw Error('Something went wrong');
    }
  }
};
