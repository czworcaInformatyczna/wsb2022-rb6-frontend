export interface IStatistics {
  barData: ExtendedChartData[];
  columnData: ChartData[];
  donutData: ChartData[];
  lineData: ChartData[];
}

export interface ExtendedChartData extends ChartData {
  secondLabel: string;
}

export interface ChartData {
  label: string;
  value: number;
}
