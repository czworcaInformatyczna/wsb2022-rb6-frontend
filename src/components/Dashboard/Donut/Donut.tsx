import { type PieSvgProps, ResponsivePie } from '@nivo/pie';
import { useTheme } from '@mui/material/styles';

export interface PieDatum {
  id: string;
  label: string;
  value: number;
}
export const Donut = (props: Partial<Omit<PieSvgProps<PieDatum>, 'height' | 'width'>>) => {
  const { palette } = useTheme();
  const config: Omit<PieSvgProps<PieDatum>, 'height' | 'width'> = {
    data: [],
    theme: {
      axis: {
        domain: {
          line: {
            stroke: palette.text.primary,
          },
        },
        legend: {
          text: {
            fill: palette.text.primary,
          },
        },
        ticks: {
          line: {
            stroke: palette.text.primary,
            strokeWidth: 1,
          },
          text: {
            fill: palette.text.primary,
          },
        },
      },
      legends: {
        text: {
          fill: palette.text.primary,
        },
      },

      tooltip: {
        container: {
          background: '#ffffff',
          color: '#333333',
          fontSize: 20,
        },
        basic: {},
        chip: {},
        table: {},
        tableCell: {},
        tableCellValue: {},
      },
    },
    margin: { top: 40, right: 50, bottom: 80, left: 80 },
    startAngle: -103,
    innerRadius: 0.6,
    padAngle: 2,
    cornerRadius: 5,
    activeInnerRadiusOffset: 13,
    activeOuterRadiusOffset: 5,
    colors: { scheme: 'set1' },
    borderWidth: 2,
    borderColor: { theme: 'background' },
    arcLinkLabelsTextOffset: 7,
    arcLinkLabelsTextColor: palette.text.primary,
    arcLinkLabelsOffset: 4,
    arcLinkLabelsThickness: 4,
    arcLinkLabelsColor: { from: 'color' },
    arcLabelsSkipAngle: 10,
    motionConfig: 'wobbly',
    transitionMode: 'startAngle',
    legends: [
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: -97,
        translateY: -107,
        itemsSpacing: 3,
        itemWidth: 111,
        itemHeight: 29,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ],

    ...props,
  };
  return <ResponsivePie {...config} />;
};
