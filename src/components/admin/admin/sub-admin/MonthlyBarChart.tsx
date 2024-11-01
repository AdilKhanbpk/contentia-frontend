'use client';

import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const barChartOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};

const MonthlyBarChart = () => {
  const [series] = useState<ApexOptions['series']>([
    {
      data: [80, 95, 70, 42, 65, 55, 78],
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    }));
  }, []);

  return <ReactApexChart options={options} series={series} type="bar" height={300} />;
};

export default MonthlyBarChart;
