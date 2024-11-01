"use client";
import { useState } from 'react';

// third-party
import ReactApexChart from 'react-apexcharts';
import { Props as ChartProps } from 'react-apexcharts';

// ==============================|| SALES CARD CHART ||============================== //

const SalesCardChart = () => {
 
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      sparkline: {
        enabled: true
      },
      height: 100,
      type: 'bar',
      toolbar: {
        show: false
      },
      offsetX: -4
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758']
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter(val: number) {
          return `$ ${val}`;
        }
      }
    },
    grid: {
      show: false
    }
  };

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  const [series] = useState([
    {
      name: 'Sales',
      data: [
        220, 230, 240, 220, 225, 215, 205, 195, 185, 150, 185, 195, 80, 205, 215, 225, 240, 225, 215, 205, 80, 215, 225, 240, 215, 210, 180
      ]
    }
  ]);

  return <ReactApexChart options={options} series={series} type="bar" height={100} />;
};

export default SalesCardChart;
