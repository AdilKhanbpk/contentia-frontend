"use client";
// components/UsersCardChart.tsx
import React, { useState } from 'react';
// third-party
import ReactApexChart from 'react-apexcharts';
import { Props as ChartProps } from 'react-apexcharts';

const UsersCardChart: React.FC = () => {

    // chart options
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
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '80%'
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
        }
    };

    const [options, setOptions] = useState<ChartProps>(areaChartOptions);

    const [series] = useState([
        {
            name: 'Users',
            data: [
                220, 230, 240, 220, 225, 215, 205, 195, 185, 150, 185, 195, 80, 205, 215, 225, 240, 225, 215, 205, 80, 215, 225, 240, 215, 210, 190
            ]
        }
    ]);

    return <ReactApexChart options={options} series={series} type="bar" height={100} />;
};
export default UsersCardChart;
