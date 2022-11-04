import { type LineConfig } from '@ant-design/charts';
import { Line } from '@ant-design/plots';
import { type ChartData } from 'features/dashboard';
import { type IChart } from 'components/Charts';

export const LineChart = ({ data = [], config = {} }: IChart<ChartData, LineConfig>) => {
  const defaultConfig = {
    data,
    xField: 'label',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 1,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  return <Line {...{ ...defaultConfig, ...config }} />;
};
