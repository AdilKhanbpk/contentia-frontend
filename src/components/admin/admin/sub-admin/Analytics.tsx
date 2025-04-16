"use client";
import { useEffect, useState } from "react";
import AnalyticsDataCard from "./AnalyticsDataCard";
import UsersCardChart from "./UsersCardChart";
import OrdersCardChart from "./OrdersCardChart";
import SalesCardChart from "./SalesCardChart";
import MarketingCardChart from "./MarketingCardChart";
import IncomeOverview from "./IncomeOverview";
import PageViews from "./PageViews";
import AnalyticEcommerce from "./AnalyticEcommerce";
import IncomeAreaChart from "./IncomeAreaChart";
import MonthlyBarChart from "./MonthlyBarChart";
import OrdersList from "./OrdersList";
import ReportChart from "./ReportChart";
import CircleChart from "./CircleChart";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchRecentOrders,
    fetchTotalCreators,
    fetchTotalCustomers,
    fetchTotalOrders,
    fetchTotalRevenueByMonth,
    fetchTotalSalesByMonth,
    fetchTotalUsersForCurrentMonth,
    OrderAnalytics,
    selectRecentOrders,
    selectTotalCreators,
    selectTotalCustomers,
    selectTotalOrders,
    selectTotalRevenue,
    selectTotalSales,
    selectTotalUsers,
} from "@/store/features/admin/dashboardSlice";
import { AppDispatch } from "@/store/store";
import { useTokenContext } from "@/context/TokenCheckingContext";

const Analytics: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [slot, setSlot] = useState<"month" | "week">("month");
    const creators = useSelector(selectTotalCreators);
    const customers = useSelector(selectTotalCustomers);
    const orders = useSelector(selectTotalOrders);
    console.log("🚀 ~ orders:", orders);
    const sales = useSelector(selectTotalSales);
    const recentOrders = useSelector(selectRecentOrders);
    const revenue = useSelector(selectTotalRevenue);
    const users = useSelector(selectTotalUsers);

    const { token } = useTokenContext();
    if (!token) return null;

    useEffect(() => {
        if (token) {
            dispatch(fetchRecentOrders(token));
            dispatch(fetchTotalSalesByMonth(token));
            dispatch(fetchTotalCreators(token));
            dispatch(fetchTotalCustomers(token));
            dispatch(fetchTotalOrders(token));
            dispatch(fetchTotalRevenueByMonth(token));
            dispatch(fetchTotalUsersForCurrentMonth(token));
        }
    }, [token]);

    const totalCustomerAndCreators =
        (creators?.totalCreatorsCount || 0) +
        (customers?.totalCustomersCount || 0);

    return (
        <>
            <div>
                {/* FOUR CARDS */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {/* TOTAL CUSTOMERS */}
                    <AnalyticsDataCard
                        title='Total Customers'
                        count={creators?.totalCreatorsCount ?? 0}
                        percentage={creators?.percentageChange}
                    >
                        <UsersCardChart
                            creatorsByMonth={
                                creators?.totalCreatorsByMonth ?? []
                            }
                        />
                    </AnalyticsDataCard>

                    {/* TOTAL ORDERS */}
                    <AnalyticsDataCard
                        title='Total Order'
                        count={orders?.totalOrdersCount ?? 0}
                        percentage={orders?.percentageChange}
                    >
                        <OrdersCardChart
                            ordersByMonth={orders?.totalOrdersByMonth ?? []}
                        />
                    </AnalyticsDataCard>

                    {/* TOTAL SALES */}
                    <AnalyticsDataCard
                        title='Total Sales'
                        count={`${(sales?.totalSales || 0).toLocaleString(
                            "tr-TR"
                        )} Tl`}
                        percentage={sales?.percentageChange}
                    >
                        <SalesCardChart
                            salesByMonth={sales?.totalSalesByMonth ?? []}
                        />
                    </AnalyticsDataCard>

                    {/* TOTAL CREATORS */}
                    <AnalyticsDataCard
                        title='Total Creators'
                        count={customers?.totalCustomersCount ?? 0}
                        percentage={customers?.percentageChange}
                    >
                        <MarketingCardChart
                            customersByMonth={
                                customers?.totalCustomersByMonth ?? []
                            }
                        />
                    </AnalyticsDataCard>
                </div>

                {/* ORDER STATUS AND BY CATEGORY */}
                <div className='my-4'>
                    {orders && <CircleChart orders={orders}></CircleChart>}
                </div>

                <div className='my-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4'>
                    <div className='w-full lg:w-3/5 bg-white shadow-md rounded-lg'>
                        {orders && sales && revenue && (
                            <IncomeOverview
                                orders={orders}
                                sales={sales}
                                revenue={revenue}
                            />
                        )}
                    </div>
                    <div className='w-full lg:w-2/5 bg-white shadow-md rounded-lg'>
                        <PageViews />
                    </div>
                </div>

                {/* FOUR CARDS  */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='col-span-1'>
                        <AnalyticEcommerce
                            title='Total Page Views'
                            count='4,42,236'
                        />
                    </div>
                    <div className='col-span-1'>
                        <AnalyticEcommerce
                            title='Total Users'
                            count={(
                                users?.totalUsersForCurrentMonth ?? ""
                            ).toString()}
                        />
                    </div>
                    <div className='col-span-1'>
                        <AnalyticEcommerce
                            title='Total Orders'
                            count={(
                                orders?.completedOrdersThisMonth ?? 0
                            ).toString()}
                        />
                    </div>
                    <div className='col-span-1'>
                        <AnalyticEcommerce
                            title='Total Sales'
                            count={`${sales?.currentMonthTotal.toLocaleString(
                                "tr-TR"
                            )} Tl`}
                        />
                    </div>
                </div>

                <div className='my-4'>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        {/* Unique Visitor Card */}
                        <div className='flex-1'>
                            <div className='flex justify-between items-center mb-2'>
                                <h5 className='text-lg font-semibold'>
                                    Unique Visitor
                                </h5>
                                <div className='flex space-x-2'>
                                    <button
                                        onClick={() => setSlot("month")}
                                        className={`px-3 py-0.5 border rounded ${
                                            slot === "month"
                                                ? "border-blue-500 text-blue-500"
                                                : "border-gray-300 text-gray-500"
                                        }`}
                                    >
                                        Month
                                    </button>
                                    <button
                                        onClick={() => setSlot("week")}
                                        className={`px-3 py-0.5 border rounded ${
                                            slot === "week"
                                                ? "border-blue-500 text-blue-500"
                                                : "border-gray-300 text-gray-500"
                                        }`}
                                    >
                                        Week
                                    </button>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg rounded-lg p-4 mt-2'>
                                <IncomeAreaChart slot={slot} />
                            </div>
                        </div>

                        {/* Income Overview Card */}
                        <div className='flex-1 lg:w-1/3'>
                            <div className='flex justify-between items-center mb-2'>
                                <h5 className='text-lg font-semibold'>
                                    Income Overview
                                </h5>
                            </div>
                            <div className='bg-white shadow-lg rounded-lg p-4 mt-2'>
                                <div className='pb-4'>
                                    <h6 className='text-gray-500'>
                                        This Week Statistics
                                    </h6>
                                    <p className='text-2xl font-bold'>
                                        {sales?.currentWeekTotalSale.toLocaleString(
                                            "tr-TR"
                                        ) + " TL"}
                                    </p>
                                </div>
                                {sales && <MonthlyBarChart sales={sales} />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders and Reports Section */}
                <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 my-4'>
                    {/* Recent Orders Section */}
                    <div className='w-full lg:w-3/5'>
                        <div className='flex items-center justify-between'>
                            <h5 className='text-lg font-semibold'>
                                Recent Orders
                            </h5>
                        </div>
                        <div className='bg-white mt-4 rounded-lg shadow'>
                            <OrdersList
                                recentOrders={
                                    Array.isArray(recentOrders)
                                        ? recentOrders
                                        : []
                                }
                            />
                        </div>
                    </div>

                    {/* Analytics Report Section */}
                    <div className='w-full lg:w-2/5'>
                        <div className='flex items-center justify-between'>
                            <h5 className='text-lg font-semibold'>
                                Analytics Report
                            </h5>
                        </div>
                        <div className='bg-white mt-4 p-4 rounded-lg shadow'>
                            <ul className='divide-y'>
                                <li className='py-3 flex justify-between items-center'>
                                    <span>Company Finance Growth</span>
                                    <h5 className='text-lg font-semibold'>
                                        +45.14%
                                    </h5>
                                </li>
                                <li className='py-3 flex justify-between items-center'>
                                    <span>Company Expenses Ratio</span>
                                    <h5 className='text-lg font-semibold'>
                                        0.58%
                                    </h5>
                                </li>
                                <li className='py-3 flex justify-between items-center'>
                                    <span>Business Risk Cases</span>
                                    <h5 className='text-lg font-semibold'>
                                        Low
                                    </h5>
                                </li>
                            </ul>
                            <ReportChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;
