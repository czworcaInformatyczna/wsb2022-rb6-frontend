import { Column } from '@ant-design/plots';
import { type ColumnData } from 'features/dashboard';

interface ColumnChartData {
  data: ColumnData[];
}
export const ColumnChart = ({ data }: ColumnChartData) => {
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'type',
      },
      sales: {
        alias: 'sales',
      },
    },
  };
  return <Column {...config} />;
};
