import { useFetch } from 'lib/react-query';

export const useGetSelfPermissions = (enable: boolean) => {
  const context = useFetch<string[]>('/user/permissions', {}, enable);
  return context;
};
