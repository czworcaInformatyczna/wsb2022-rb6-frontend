export interface IStatistics {
  barData: IBarData;
  donutData: IDonutData;
}

export interface IDonutData {
  type: string;
  value: number;
}

export interface IBarData {
  country: string;
  value: number;
  year: string;
}
