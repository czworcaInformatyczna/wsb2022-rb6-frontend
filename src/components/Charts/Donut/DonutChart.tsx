import { type PieConfig } from '@ant-design/charts';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { type ChartData } from 'features/dashboard';
import { type IChart } from 'components/Charts';
import { useTheme } from '@mui/material/styles';

export const DonutChart = ({ data, config = {} }: IChart<ChartData, PieConfig>) => {
  const theme = useTheme();
  const renderStatistic = (containerWidth: any, text: any, style: any) => {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const textStyleStr = `width:${containerWidth}px; color:${theme.palette.text.primary}`;

    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  };

  const defaultConfig = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'label',

    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: any) => `${v}`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container: any, view: any, datum: ChartData | undefined) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.label : 'All';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container: HTMLElement, view: any, datum: any, dataT: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `${datum.value}`
            : `${dataT.reduce((r: any, d: any) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },

    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  return <Pie {...{ ...(defaultConfig as PieConfig), ...config }} />;
};
