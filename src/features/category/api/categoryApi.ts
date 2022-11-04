import { usePost } from 'lib/react-query';

export const useAddCategory = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};
