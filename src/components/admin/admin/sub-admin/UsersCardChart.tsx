"use client";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Props as ChartProps } from "react-apexcharts";

interface UsersCardChartProps {
    creatorsByMonth: number[];
}

const UsersCardChart: React.FC<UsersCardChartProps> = ({ creatorsByMonth }) => {
    const areaChartOptions = {
        chart: {
            id: "new-stack-chart",
            sparkline: {
                enabled: true,
            },
            height: 100,
            type: "bar",
            toolbar: {
                show: false,
            },
            offsetX: -4,
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: "80%",
            },
        },
        tooltip: {
            x: {
                show: false,
            },
            y: {
                formatter(val: number) {
                    return `$ ${val}`;
                },
            },
        },
    };

    const [options, setOptions] = useState<ChartProps>(areaChartOptions);

    const [series] = useState([
        {
            name: "Creators",
            data: creatorsByMonth,
        },
    ]);

    return (
        <ReactApexChart
            options={options}
            series={series}
            type='bar'
            height={100}
        />
    );
};
export default UsersCardChart;
