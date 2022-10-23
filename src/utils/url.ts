import { API_URL } from 'config';
import { compile } from 'path-to-regexp';

export const url = (path: string): string => `${API_URL}${path}`;
export const convertUrl = (path: string, params: object = {}) => compile(path)(params);
