import axios, { type AxiosRequestConfig } from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';
import { tokenCookie } from 'providers/AuthProvider';

const requestInterceptor = (config: AxiosRequestConfig) => {
  const apiToken = Cookies.get(tokenCookie);
  if (apiToken) {
    config.headers = {
      Authorization: `Bearer ${apiToken}`,
      Accept: 'application/json',
    };
  }

  return config;
};

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(requestInterceptor);
