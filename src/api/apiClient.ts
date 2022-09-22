import axios from 'axios';

const BASE_URL = 'http://137.74.158.36:81/api/';

export const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: BASE_URL,
});

export const apiPrivateClient = axios.create({
  // Later read this URLfrom an environment variable
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
