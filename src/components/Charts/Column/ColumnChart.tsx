import { type ColumnConfig } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { type ChartData } from 'features/dashboard';
import { type IChart } from 'components/Charts';

export const ColumnChart = ({ data, config = {} }: IChart<ChartData, ColumnConfig>) => {
  const defaultConfig = {
    data,
    xField: 'label',
    yField: 'value',
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
      value: {
        alias: 'value',
      },
    },
  };
  return <Column {...{ ...defaultConfig, ...config }} />;
};
