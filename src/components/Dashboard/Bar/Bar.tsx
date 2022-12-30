import { useTheme } from '@mui/material/styles';
import { ResponsiveBar } from '@nivo/bar';
import { type BarDatum, type BarSvgProps } from '@nivo/bar';

export const Bar = (props: Partial<Omit<BarSvgProps<BarDatum>, 'height' | 'width'>>) => {
  const { palette } = useTheme();
  const config: Omit<BarSvgProps<BarDatum>, 'height' | 'width'> = {
    data: [],
    keys: [],
    indexBy: 'name',
    theme: {
      axis: {
        domain: { line: { stroke: palette.text.primary } },
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
    margin: { top: 50, right: 130, bottom: 50, left: 60 },
    padding: 0.3,
    valueScale: { type: 'linear' },
    indexScale: { type: 'band', round: true },
    colors: { scheme: 'purple_orange' },
    borderColor: {
      from: 'color',
      modifiers: [['darker', 1.6]],
    },
    axisTop: null,
    axisRight: null,
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'name',
      legendPosition: 'middle',
      legendOffset: 32,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'assets_count',
      legendPosition: 'middle',
      legendOffset: -40,
    },
    // labelSkipWidth: 12,
    // labelSkipHeight: 12,
    // labelTextColor: {
    //   from: 'color',
    //   modifiers: [['darker', 1.6]],
    // },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
    role: 'application',
    ariaLabel: 'Bar',
    tooltip: undefined,
    ...props,
  };
  return <ResponsiveBar {...config} />;
};
