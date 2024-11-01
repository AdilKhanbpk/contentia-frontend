"use client";
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Props as ChartProps } from 'react-apexcharts';

const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 1.5 },
  grid: { strokeDashArray: 4 },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-05-19T00:00:00.000Z',
      '2018-06-19T00:00:00.000Z',
      '2018-07-19T01:30:00.000Z',
      '2018-08-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-10-19T04:30:00.000Z',
      '2018-11-19T05:30:00.000Z',
      '2018-12-19T06:30:00.000Z'
    ],
    labels: { format: 'MMM' },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: { show: false },
  tooltip: { x: { format: 'MM' } }
};

const ReportChart = () => {
  const [options, setOptions] = useState<ChartProps>(areaChartOptions);
  const [series] = useState([{ name: 'Income', data: [58, 90, 38, 83, 63, 75, 35, 55] }]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      tooltip: {
        y: {
          formatter(val: number) {
            return `$ ${val}`;
          }
        }
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, []);

  return <ReactApexChart options={options} series={series} type="line" height={340} />;
};

export default ReportChart;
