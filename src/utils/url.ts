import { API_URL } from 'config';

export const url = (path: string): string => `${API_URL}${path}`;
