import React, { useEffect, useRef, useState } from 'react';
import Highcharts, { Chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataPoint } from '../../models';

export interface PieChartProps {
  title: string;
  data: Array<DataPoint>;
}

export const PieChart = ({ title, data }: PieChartProps) => {
  const chartRef =
    useRef<{
      chart: Chart;
      container: React.RefObject<HTMLDivElement>;
    }>(null);

  const [chartOptions, setChartOptions] = useState({
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
        allowPointSelect: true,
        center: ['50%', '42%'],
        cursor: 'pointer',
        size: '70%',
        dataLabels: {
          distance: 30, // this is the default
          format: '{point.name}<br /><b>{point.y}%</b>',
          style: {
            fontSize: '12px',
            fontWeight: 300,
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
    series: [{}],
    title: {
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 500,
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
    // @ts-ignore
    setChartOptions({
      series: [{ data }],
    });
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { width: '100%', height: '100%' } }}
      options={chartOptions}
      ref={chartRef}
    />
  );
};
