import { validateEnvVar } from 'config';

export const API_URL = validateEnvVar(process.env.REACT_APP_API_URL as string);
export const MOCK_API = validateEnvVar(process.env.REACT_APP_MOCK_API as string);
