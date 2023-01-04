import axios, { type AxiosRequestConfig } from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';
import { emailCookie, permissionCookie, tokenCookie } from 'providers/AuthProvider';

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

const handleError = (error: any) => {
  const status = error.response.status;
  if (status === 401) {
    Cookies.remove(tokenCookie);
    Cookies.remove(emailCookie);
    Cookies.remove(permissionCookie);
    if (error.config.url !== '/login') window.location.href = '/login';
  }

  if (status === 404) {
    window.location.href = '/PageNotFound';
  }
};

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use((response) => {
  return response;
}, handleError);
