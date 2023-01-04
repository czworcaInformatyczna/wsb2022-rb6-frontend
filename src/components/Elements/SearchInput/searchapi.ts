import { useFetch } from 'lib/react-query';

export interface ISearch {
  searched: string;
}

export const useGetSearch = <T>(search: ISearch, enable: boolean = true) => {
  const context = useFetch<T>('/search', search, enable);
  return context;
};
