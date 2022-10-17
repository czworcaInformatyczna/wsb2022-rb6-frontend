/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { MOCK_API } from 'config';

export const developmentMode = (): void => {
  if (MOCK_API) {
    if (typeof window === 'undefined') {
      const { mswServer } = require('./');
      mswServer.listen();
    } else {
      const { mswWorker } = require('./');
      mswWorker.start();
    }
  }
};
