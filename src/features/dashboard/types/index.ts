import { type BarDatum } from '@nivo/bar';
import { type PieDatum } from 'components/Dashboard';

export interface AssetCategoryStatistic extends StatisticBase, BarDatum {
  models_count: number;
}

export interface StatisticBase {
  assets_count: number;
  id: number;
  name: string;
}

export interface AssetStatusStatistic extends BarDatum {
  count: number;
  status: number;
}

export interface Statistics {
  assetCategory: AssetCategoryStatistic[];
  assetModel: PieDatum[];
  assetStatus: PieDatum[];
  manufacturer: PieDatum[];
  user: StatisticBase[];
}
