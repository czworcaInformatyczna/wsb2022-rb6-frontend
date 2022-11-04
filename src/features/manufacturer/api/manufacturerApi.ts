import { usePost } from 'lib/react-query';

export const useAddManufacturer = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};
