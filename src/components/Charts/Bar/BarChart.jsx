/* eslint-disable react/prop-types */
import { Bar } from '@ant-design/plots';

export const BarChart = ({ data }) => {
  const config = {
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'country',
    isPercent: true,
    isStack: true,

    label: {
      position: 'middle',
      content: (item) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
  };
  return <Bar {...config} />;
};
