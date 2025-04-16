"use client";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Props as ChartProps } from "react-apexcharts";

const areaChartOptions = {
    chart: {
        height: 355,
        type: "area",
        toolbar: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            type: "vertical",
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "straight",
        width: 1,
    },
    grid: {
        show: true,
        borderColor: "#90A4AE",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
};

interface Props {
    slot: string;
    quantity: any;
    orders: any;
    sales: any;
    revenue: any;
}

// By sales => Total Price Of orders
// By margin => Total price of order - Total amount of money paid to creators
// By volume => The amount of order in the relevant week/month

const IncomeAreaChart = ({ slot, quantity, orders, sales, revenue }: Props) => {
    const [options, setOptions] = useState<ChartProps>(areaChartOptions);
    const [series, setSeries] = useState([
        {
            name: "Income",
            data: [0, 86, 28, 115, 48, 210, 136],
        },
    ]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            xaxis: {
                categories:
                    slot === "month"
                        ? [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                          ]
                        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                labels: {
                    style: {
                        colors: Array(12).fill("#6b7280"),
                    },
                },
                axisBorder: {
                    show: true,
                    color: "#e0e0e0",
                },
                tickAmount: slot === "month" ? 11 : 6,
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ["#6b7280"],
                    },
                },
            },
            grid: {
                borderColor: "#e0e0e0",
            },
            tooltip: {
                y: {
                    formatter(val: number) {
                        return `$ ${val}`;
                    },
                },
            },
        }));
    }, [slot]);

    useEffect(() => {
        switch (quantity) {
            case "By volume":
                setSeries([
                    {
                        name: "Orders",
                        data:
                            slot === "month"
                                ? orders.totalOrdersByMonth
                                : orders.totalOrdersByWeek,
                    },
                ]);
                break;
            case "By margin":
                setSeries([
                    {
                        name: "Total Revenue",
                        data:
                            slot === "month"
                                ? revenue.totalRevenueByMonth
                                : revenue.totalRevenueByWeek,
                    },
                ]);
                break;
            case "By sales":
                setSeries([
                    {
                        name: "Total Price Of Orders",
                        data:
                            slot === "month"
                                ? sales.totalSalesByMonth
                                : sales.totalSalesByWeek,
                    },
                ]);
                break;
            default:
                break;
        }
    }, [slot, quantity]);

    return (
        <ReactApexChart
            options={options}
            series={series}
            type='area'
            height={355}
        />
    );
};

export default IncomeAreaChart;
