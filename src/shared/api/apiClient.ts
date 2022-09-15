import axios from 'axios';

const base = 'http://137.74.158.36:81/api/';
const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: base,
});

export default apiClient;
