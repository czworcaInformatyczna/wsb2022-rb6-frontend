import { useQuery } from 'react-query';
import apiService from '../../shared/api/apiService';

export const useTodosQuery = ({ email, password }: any) =>
  useQuery('userToken', async () => await apiService.getToken({ email, password }), {
    enabled: false,
  });
