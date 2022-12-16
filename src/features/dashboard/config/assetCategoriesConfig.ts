import { type BarDatum, type BarSvgProps } from '@nivo/bar';
import { type AssetCategoryStatistic } from 'features/dashboard';

export const getAssetCategoriesProps = (
  data: AssetCategoryStatistic[],
): Omit<BarSvgProps<BarDatum>, 'height' | 'width'> => {
  return {
    data,
    keys: ['assets_count'],
    indexBy: 'name',
    padding: 0.3,
    colors: { scheme: 'dark2' },
    borderColor: {
      from: 'color',
      modifiers: [['darker', 1.6]],
    },
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Asset name',
      legendPosition: 'middle',
      legendOffset: 32,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Count',
      legendPosition: 'middle',
      legendOffset: -40,
    },
    legends: [],
  };
};
