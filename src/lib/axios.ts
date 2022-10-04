import axios from 'axios';
import { API_URL } from 'config';

export const apiClient = axios.create({
  baseURL: API_URL,
});

export const apiPrivateClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
