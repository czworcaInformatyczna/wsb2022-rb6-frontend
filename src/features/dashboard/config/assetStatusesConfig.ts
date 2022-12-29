/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/dot-notation */

import { type PieSvgProps } from '@nivo/pie';
import { type PieDatum } from 'components/Dashboard';

const replaceKeys = (obj: any) => {
  if (obj.status === 0) obj.status = 'Maintenance';
  else if (obj.status === 25) obj.status = 'Ready to deploy';
  else if (obj.status === 50) obj.status = 'Deployed';
  else if (obj.status === 100) obj.status = 'Archived';

  obj.id = obj.status;
  obj['label'] = obj['status'];
  obj['value'] = obj['count'];

  delete obj['status'];
  delete obj['count'];
};

export const getAssetStatusesProps = (
  data: PieDatum[],
): Partial<Omit<PieSvgProps<PieDatum>, 'height' | 'width'>> => {
  const result = JSON.parse(JSON.stringify(data));
  result.forEach((obj: any) => replaceKeys(obj));

  return { data: result, legends: [], colors: { scheme: 'red_yellow_green' } };
};
