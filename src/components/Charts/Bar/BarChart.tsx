import { type BarConfig } from '@ant-design/charts';
import { Bar } from '@ant-design/plots';
import { type IChart } from 'components/Charts';
import { type ExtendedChartData } from 'features/dashboard';

export const BarChart = ({ data, config = {} }: IChart<ExtendedChartData, BarConfig>) => {
  const defaultConfig = {
    data,
    xField: 'value',
    yField: 'label',
    seriesField: 'secondLabel',
    isPercent: true,
    isStack: true,
    label: {
      position: 'middle',
      content: (item: any) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
  };
  return <Bar {...{ ...(defaultConfig as BarConfig), ...config }} />;
};
