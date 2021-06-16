import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export interface LineChartProps {
  title: string;
  series: any;
}

export const LineChart = ({ title, series }: LineChartProps) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'line',
      style: {
        fontFamily: 'Inter',
      },
      marginTop: 60,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
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
    title: {
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 500,
        color: '#486581',
      },
      text: title,
    },
    xAxis: {
      tickInterval: 1,
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        // @ts-ignore
        formatter: function () {
          // @ts-ignore
          return this.value + '%';
        },
      },
    },
    legend: {
      layout: 'vertical',
      itemMarginBottom: 8,
      floating: true,
      align: 'left',
      verticalAlign: 'top',
      x: 60,
      y: 50,
    },
    tooltip: {
      // @ts-ignore
      formatter: function () {
        // @ts-ignore
        return this.y + '%';
      },
    },
  });

  useEffect(() => {
    // overwrite the options - the new ones will be passed to chart.update()
    // see https://github.com/highcharts/highcharts-react#optimal-way-to-update
    // @ts-ignore
    setChartOptions({
      series,
    });
  }, [series]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { width: '100%', height: '100%' } }}
      options={chartOptions}
    />
  );
};
