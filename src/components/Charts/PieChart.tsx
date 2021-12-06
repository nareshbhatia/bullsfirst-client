import React, { useEffect, useState } from 'react';
import Highcharts, {
  DrilldownOptions,
  Options,
  SeriesPieOptions,
} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
drilldown(Highcharts);

export interface PieChartProps {
  title: string;
  series: SeriesPieOptions[];
  drilldown: DrilldownOptions;
}

export const PieChart = ({ title, series, drilldown }: PieChartProps) => {
  const [chartOptions, setChartOptions] = useState<Options>({
    chart: {
      type: 'pie',
      style: {
        fontFamily: 'Inter',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        center: ['50%', '42%'],
        size: '70%',
        dataLabels: {
          distance: 30, // this is the default
          format: '{point.name}<br /><b>{point.y}%</b>',
          style: {
            fontSize: '12px',
            fontWeight: '300',
            textOverflow: 'clip',
          },
        },
      },
      series: {
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
      },
    },
    series: [],
    drilldown: {
      series: [],
    },
    title: {
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#486581',
      },
      text: title,
    },
    tooltip: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            // rule applies when chart width is less than this
            maxWidth: 400,
          },
          chartOptions: {
            plotOptions: {
              pie: {
                size: '50%',
                dataLabels: {
                  distance: 25,
                },
              },
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    // overwrite the options - the new ones will be passed to chart.update()
    // see https://github.com/highcharts/highcharts-react#optimal-way-to-update
    setChartOptions({
      series,
      drilldown,
    });
  }, [series, drilldown]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { width: '100%', height: '100%' } }}
      options={chartOptions}
    />
  );
};
