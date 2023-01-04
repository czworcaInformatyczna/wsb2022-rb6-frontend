/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/dot-notation */

import { type PieSvgProps } from '@nivo/pie';
import { type PieDatum } from 'components/Dashboard';

const replaceKeys = (obj: any) => {
  if (obj.id && obj.name) obj.id = obj.name;
  obj['label'] = obj['name'];
  obj['value'] = obj['assets_count'];

  delete obj['name'];
  delete obj['assets_count'];
};

export const getManufacturerProps = (
  data: PieDatum[],
): Partial<Omit<PieSvgProps<PieDatum>, 'height' | 'width'>> => {
  const result = JSON.parse(JSON.stringify(data));
  result.forEach((obj: any) => replaceKeys(obj));

  return { data: result, legends: [] };
};
