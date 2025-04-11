"use client";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Props as ChartProps } from "react-apexcharts";

const SalesCardChart = ({ salesByMonth }: { salesByMonth: number[] }) => {
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
        plotOptions: {
            bar: {
                borderRadius: 0,
            },
        },
        dataLabels: {
            enabled: false,
            offsetY: -20,
            style: {
                fontSize: "12px",
                colors: ["#304758"],
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
        grid: {
            show: false,
        },
    };

    const [options, setOptions] = useState<ChartProps>(areaChartOptions);

    const [series] = useState([
        {
            name: "Sales",
            data: salesByMonth,
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

export default SalesCardChart;
