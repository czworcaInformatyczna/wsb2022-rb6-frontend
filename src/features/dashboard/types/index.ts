export interface IStatistics {
  barData: IBarData;
  columnData: ColumnData[];
  donutData: IDonutData;
  lineData: LineData[];
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

export interface LineData {
  value: number;
  year: string;
}
export interface ColumnData {
  value: number;
  year: string;
}
