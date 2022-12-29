/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { MOCK_API } from 'config';

export const developmentMode = (): void => {
  console.log(MOCK_API);
  if (MOCK_API) {
    const { mswWorker } = require('./mswWorker');
    mswWorker.start();
  }
};
